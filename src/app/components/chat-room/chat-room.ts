import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService, Message } from '../../services/chat.service';
import { DatabaseService, Room } from '../../services/database.service';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer';
import { SeoService } from '../../services/seo.service';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-chat-room',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, CountdownTimerComponent],
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
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPasswordModal = false;
  isPasswordRequired = false;
  showRoomSettings = false;
  roomVisibilityToggle = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private chatService: ChatService,
    private databaseService: DatabaseService,
    private seoService: SeoService,
    public encryptionService: EncryptionService
  ) {
    this.messageForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.usernameForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(1)]]
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
    }
  }

  ngOnDestroy() {
    if (this.roomId) {
      this.chatService.unsubscribeFromRoom(this.roomId);
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
        this.messages.push(decryptedMessages[0]);
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
      } else {
        this.errorMessage = 'Mật khẩu không đúng';
        this.passwordForm.reset();
      }
    }
  }

  setUsername() {
    if (this.usernameForm.valid) {
      this.currentUsername = this.usernameForm.value.username;
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
    if (this.messageForm.valid && this.roomId && this.currentUsername) {
      const { content } = this.messageForm.value;
      
      const { error } = await this.chatService.sendMessage(
        this.roomId,
        `${this.currentUsername}: ${content}`,
        'anonymous'
      );

      if (error) {
        console.error('Error sending message:', error);
        this.errorMessage = 'Không thể gửi tin nhắn';
      } else {
        this.messageForm.reset();
        this.errorMessage = '';
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
    } else {
      this.roomVisibilityToggle = newVisibility;
      if (this.room) {
        this.room.is_public = newVisibility;
      }
      this.successMessage = newVisibility ? 'Phòng đã được công khai' : 'Phòng đã được ẩn';
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
}
