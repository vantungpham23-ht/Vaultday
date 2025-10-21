import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService, Message } from '../../services/chat.service';
import { SupabaseService, Room } from '../../services/supabase.service';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer';

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
  showPasswordModal = false;
  isPasswordRequired = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private chatService: ChatService,
    private supabaseService: SupabaseService
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

    const { data, error } = await this.supabaseService.getRoomById(this.roomId);
    
    if (error) {
      console.error('Error loading room:', error);
      this.errorMessage = 'Phòng không tồn tại';
    } else {
      this.room = data;
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
      this.messages = data || [];
    }
    this.isLoading = false;
  }

  subscribeToMessages() {
    if (!this.roomId) return;

    this.chatService.listenToRoom(this.roomId, (newMessage: Message) => {
      this.messages.push(newMessage);
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
