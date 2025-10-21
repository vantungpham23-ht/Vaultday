import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService, Room } from '../../services/supabase.service';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer';
import { testDbQuery, testDbQueryPost } from '../../services/test-db.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, CountdownTimerComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  joinRoomForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  publicRooms: Room[] = [];
  isLoadingRooms = false;
  showJoinRoom = false;
  currentRoom: Room | null = null;
  generatedRoomCode: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.joinRoomForm = this.fb.group({
      roomId: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit() {
    this.loadPublicRooms();
    
    // Test Netlify function
    console.log('Testing Netlify function...');
    testDbQuery();
    testDbQueryPost();
  }

  onJoinRoom() {
    if (this.joinRoomForm.valid) {
      const { roomId } = this.joinRoomForm.value;
      this.currentRoom = { id: roomId, name: 'Unknown Room', created_at: new Date().toISOString(), password: null, created_by: null };
      this.router.navigate(['/room', roomId]);
    }
  }

  async onCreateAndJoinRoom() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      // Tạo mã phòng ngẫu nhiên (6 ký tự)
      const roomCode = this.generateRoomCode();
      
      // Tạo phòng với mã code làm tên
      const { data, error } = await this.supabaseService.createRoom(`Room-${roomCode}`, null);

      if (error) {
        console.error('Error creating room:', error);
        this.errorMessage = 'Không thể tạo phòng. Vui lòng thử lại.';
      } else if (data) {
        this.generatedRoomCode = roomCode;
        this.successMessage = 'Phòng đã được tạo thành công!';
        this.currentRoom = data;
        
        // Tự động chuyển vào phòng chat
        setTimeout(() => {
          this.router.navigate(['/room', data.id]);
        }, 1500);
      }
    } catch (error) {
      console.error('Error:', error);
      this.errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại.';
    }
    
    this.isLoading = false;
  }

  private generateRoomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async loadPublicRooms() {
    this.isLoadingRooms = true;
    const { data, error } = await this.supabaseService.getPublicRooms();

    if (error) {
      console.error('Error loading public rooms:', error);
      this.publicRooms = [];
    } else {
      this.publicRooms = data || [];
    }
    this.isLoadingRooms = false;
  }

  goToRoom(roomId: string) {
    this.router.navigate(['/room', roomId]);
  }

  get roomId() {
    return this.joinRoomForm.get('roomId');
  }

  copyRoomCode() {
    if (this.generatedRoomCode) {
      navigator.clipboard.writeText(this.generatedRoomCode).then(() => {
        this.successMessage = 'Đã copy mã phòng vào clipboard!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }).catch(() => {
        this.errorMessage = 'Không thể copy mã phòng';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
    }
  }
}
