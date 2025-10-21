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
  createRoomForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  publicRooms: Room[] = [];
  isLoadingRooms = false;
  showCreateRoom = false;
  showJoinRoom = false;
  currentRoom: Room | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.joinRoomForm = this.fb.group({
      roomId: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.createRoomForm = this.fb.group({
      roomName: ['', [Validators.required, Validators.minLength(1)]],
      password: ['']
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

  async onCreateRoom() {
    if (this.createRoomForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { roomName, password } = this.createRoomForm.value;
      const { data, error } = await this.supabaseService.createRoom(roomName, password);

      if (error) {
        console.error('Error creating room:', error);
        this.errorMessage = 'Không thể tạo phòng. Vui lòng thử lại.';
      } else if (data) {
        this.successMessage = 'Phòng đã được tạo thành công!';
        this.createRoomForm.reset();
        this.showCreateRoom = false;
        this.loadPublicRooms(); // Refresh the list
      }
      this.isLoading = false;
    }
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

  get roomName() {
    return this.createRoomForm.get('roomName');
  }

  get password() {
    return this.createRoomForm.get('password');
  }
}
