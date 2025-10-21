import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService, Message } from '../../services/chat.service';
import { DatabaseService, Room } from '../../services/database.service';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer';
import { SeoService } from '../../services/seo.service';
import { EncryptionService } from '../../services/encryption.service';
import { StorageService } from '../../services/storage.service';
import { SoundService } from '../../services/sound.service';
import { SoundClickDirective } from '../../directives/sound-click.directive';
import { ThemeService } from '../../services/theme.service';
import { UserColorService } from '../../services/user-color.service';

@Component({
  selector: 'app-chat-room',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, CountdownTimerComponent, SoundClickDirective],
  templateUrl: './chat-room.html',
  styleUrl: './chat-room.scss'
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  roomId: string | null = null;
  room: Room | null = null;
  messages: Message[] = [];
  messageForm: FormGroup;
  usernameForm: FormGroup;
  passwordForm: FormGroup;
  currentUsername: string = '';
  currentUserId: string = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPasswordModal = false;
  isPasswordRequired = false;
  showRoomSettings = false;
  roomVisibilityToggle = false;
  lastMessageTime = 0;
  rateLimitSeconds = 5;
  private cooldownInterval: any;
  @ViewChild('messagesContainer') messagesContainerRef?: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private chatService: ChatService,
    private databaseService: DatabaseService,
    private seoService: SeoService,
    public encryptionService: EncryptionService,
    private storageService: StorageService,
    private soundService: SoundService,
    public userColorService: UserColorService,
    private themeService: ThemeService
  ) {
    this.messageForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]]
    });

    // Try to load cached username for form initialization
    const cachedUsername = this.storageService.getUsername();
    this.usernameForm = this.fb.group({
      username: [cachedUsername || '', [Validators.required, Validators.minLength(1)]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  async ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    
    if (!this.roomId) {
      this.router.navigate(['/']);
      return;
    }

    // Try to load cached username and user ID
    this.loadCachedUserData();

    // Fetch room details
    await this.loadRoomDetails();
    
    // Update SEO for chat room
    if (this.room) {
      this.seoService.setChatRoomSEO(this.room.name);
    }

    // Check if password is required
    if (this.room?.password) {
      this.isPasswordRequired = true;
      this.showPasswordModal = true;
    } else {
      // Load messages and subscribe if no password required
      await this.loadMessages();
      this.subscribeToMessages();
      // Ensure we see the latest messages when entering room
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  ngOnDestroy() {
    if (this.roomId) {
      this.chatService.unsubscribeFromRoom(this.roomId);
    }
    if (this.cooldownInterval) {
      clearInterval(this.cooldownInterval);
    }
  }

  loadCachedUserData(): void {
    const cachedUsername = this.storageService.getUsername();
    const cachedUserId = this.storageService.getUserId();
    
    if (cachedUsername && cachedUserId) {
      this.currentUsername = cachedUsername;
      this.currentUserId = cachedUserId;
      console.log('✅ Loaded cached user data:', { username: cachedUsername, userId: cachedUserId });
    }
  }

  async loadRoomDetails() {
    if (!this.roomId) return;

    const { data, error } = await this.databaseService.getRoomById(this.roomId);
    
    if (error) {
      console.error('Error loading room:', error);
      this.errorMessage = 'Phòng không tồn tại';
    } else {
      this.room = data;
      this.roomVisibilityToggle = this.room?.is_public || false;
    }
  }

  async loadMessages() {
    if (!this.roomId) return;

    this.isLoading = true;
    const { data, error } = await this.chatService.fetchMessages(this.roomId);
    
    if (error) {
      console.error('Error loading messages:', error);
      this.errorMessage = 'Không thể tải tin nhắn';
    } else {
      // Decrypt all messages at once
      this.messages = await this.chatService.decryptAllMessages(data || [], this.roomId);
    }
    this.isLoading = false;
    // Ensure we see the latest messages at the bottom
    setTimeout(() => this.scrollToBottom(), 0);
  }

  subscribeToMessages() {
    if (!this.roomId) return;

    // Unsubscribe first to prevent multiple subscriptions
    this.chatService.unsubscribeFromRoom(this.roomId);

    this.chatService.listenToRoom(this.roomId, async (newMessage: Message) => {
      // Check if message already exists to prevent duplicates
      const messageExists = this.messages.some(msg => msg.id === newMessage.id);
      if (!messageExists) {
        // Decrypt the new message before adding
        const decryptedMessages = await this.chatService.decryptAllMessages([newMessage], this.roomId!);
        // Append newest at the bottom
        this.messages.push(decryptedMessages[0]);
        // Auto scroll to bottom on new message
        setTimeout(() => this.scrollToBottom(), 0);
      }
    });
  }

  async verifyPassword() {
    if (this.passwordForm.valid && this.room) {
      const { password } = this.passwordForm.value;
      
      if (password === this.room.password) {
        this.showPasswordModal = false;
        this.isPasswordRequired = false;
        await this.loadMessages();
        this.subscribeToMessages();
        this.soundService.playSuccess();
        // Scroll to bottom after password verification
        setTimeout(() => this.scrollToBottom(), 100);
      } else {
        this.errorMessage = 'Mật khẩu không đúng';
        this.passwordForm.reset();
        this.soundService.playError();
      }
    }
  }

  setUsername() {
    if (this.usernameForm.valid) {
      this.currentUsername = this.usernameForm.value.username;
      // Generate a unique user ID for this session
      this.currentUserId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Save to cache
      this.storageService.saveUsername(this.currentUsername);
      this.storageService.saveUserId(this.currentUserId);
      
      console.log('✅ Saved user data to cache:', { username: this.currentUsername, userId: this.currentUserId });
    }
  }

  async decryptMessage(message: Message): Promise<string> {
    try {
      return await this.chatService.decryptMessage(message, this.roomId!);
    } catch (error) {
      console.error('Failed to decrypt message:', error);
      return message.content;
    }
  }

  async sendMessage() {
    if (this.messageForm.valid && this.roomId && this.currentUsername && this.currentUserId) {
      // Check rate limit
      if (!this.canSendMessage()) {
        const remaining = this.getRemainingCooldown();
        this.errorMessage = `Vui lòng đợi ${remaining} giây trước khi gửi tin nhắn tiếp theo`;
        this.soundService.playError();
        return;
      }

      const { content } = this.messageForm.value;
      
      const { error } = await this.chatService.sendMessage(
        this.roomId,
        content, // Send just the content, not with username prefix
        this.currentUserId, // Use the actual user ID
        this.currentUsername // Add username to message
      );

      if (error) {
        console.error('Error sending message:', error);
        this.errorMessage = 'Không thể gửi tin nhắn';
        this.soundService.playError();
      } else {
        this.messageForm.reset();
        this.errorMessage = '';
        this.lastMessageTime = Date.now(); // Update last message time
        this.startCooldownTimer();
        this.soundService.playMessageSend();
        // After sending, scroll to bottom to show the new message
        setTimeout(() => this.scrollToBottom(), 0);
      }
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  toggleRoomSettings() {
    this.showRoomSettings = !this.showRoomSettings;
  }

  async toggleRoomVisibility() {
    if (!this.roomId) return;
    
    const newVisibility = !this.roomVisibilityToggle;
    const { data, error } = await this.databaseService.updateRoomVisibility(this.roomId, newVisibility);
    
    if (error) {
      console.error('Error updating room visibility:', error);
      this.errorMessage = 'Không thể cập nhật trạng thái phòng';
      this.soundService.playError();
    } else {
      this.roomVisibilityToggle = newVisibility;
      if (this.room) {
        this.room.is_public = newVisibility;
      }
      this.successMessage = newVisibility ? 'Phòng đã được công khai' : 'Phòng đã được ẩn';
      this.soundService.playToggle();
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }

  get content() {
    return this.messageForm.get('content');
  }

  get username() {
    return this.usernameForm.get('username');
  }

  get password() {
    return this.passwordForm.get('password');
  }

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }

  isOwnMessage(message: Message): boolean {
    return message.user_id === this.currentUserId;
  }

  // Get username for display
  getMessageUsername(message: Message): string {
    if (message.username) {
      return message.username;
    }
    // Fallback: if no username, show "Người dùng" + first 4 chars of user_id
    return message.user_id ? `Người dùng ${message.user_id.substring(0, 4)}` : 'Ẩn danh';
  }

  // Get user color for message
  getUserColor(userId: string): string {
    return this.userColorService.getUserColor(userId);
  }

  // Get user color light for background
  getUserColorLight(userId: string): string {
    return this.userColorService.getUserColorLight(userId);
  }

  // Get user color dark for border
  getUserColorDark(userId: string): string {
    return this.userColorService.getUserColorDark(userId);
  }

  canSendMessage(): boolean {
    const now = Date.now();
    const timeSinceLastMessage = now - this.lastMessageTime;
    return timeSinceLastMessage >= (this.rateLimitSeconds * 1000);
  }

  getRemainingCooldown(): number {
    const now = Date.now();
    const timeSinceLastMessage = now - this.lastMessageTime;
    const remaining = (this.rateLimitSeconds * 1000) - timeSinceLastMessage;
    return Math.max(0, Math.ceil(remaining / 1000));
  }

  startCooldownTimer(): void {
    if (this.cooldownInterval) {
      clearInterval(this.cooldownInterval);
    }
    
    this.cooldownInterval = setInterval(() => {
      if (this.canSendMessage()) {
        clearInterval(this.cooldownInterval);
        this.cooldownInterval = null;
      }
    }, 1000); // Update every second
  }

  private scrollToBottom(): void {
    const el = this.messagesContainerRef?.nativeElement;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }

  // Theme methods
  get isDark(): boolean {
    return this.themeService.isDark();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
