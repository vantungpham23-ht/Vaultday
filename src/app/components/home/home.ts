import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatabaseService, Room } from '../../services/database.service';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer';
import { SeoService } from '../../services/seo.service';

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
    private databaseService: DatabaseService,
    private seoService: SeoService
  ) {
    this.joinRoomForm = this.fb.group({
      roomId: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  async ngOnInit() {
    // Set SEO for home page
    this.seoService.setHomePageSEO();
    
          // Test database connection first
          console.log('Testing Neon database connection...');
          const connectionTest = await this.databaseService.testConnection();
          console.log('Connection test result:', connectionTest);
          
          if (connectionTest.ok) {
            console.log('✅ Database connection successful!');
            this.loadPublicRooms();
          } else {
            console.error('❌ Database connection failed:', connectionTest.error);
            this.errorMessage = 'Không thể kết nối database. Vui lòng kiểm tra cấu hình.';
          }
  }

  async onJoinRoom() {
    if (this.joinRoomForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { roomId } = this.joinRoomForm.value;
      
      try {
        // Kiểm tra xem phòng có tồn tại không
        const { data: existingRoom, error } = await this.databaseService.getRoomById(roomId);
        
        if (error || !existingRoom) {
          // Phòng không tồn tại, tạo phòng mới với mã code này
          const { data: newRoom, error: createError } = await this.databaseService.createRoom(`Room-${roomId}`, undefined, true);
          
          if (createError || !newRoom) {
            console.error('Error creating room:', createError);
            this.errorMessage = 'Không thể tạo phòng. Vui lòng thử lại.';
            this.isLoading = false;
            return;
          }
          
          this.successMessage = 'Phòng mới đã được tạo với mã này!';
          this.generatedRoomCode = roomId;
          this.currentRoom = newRoom;
          
          // Tự động chuyển vào phòng chat
          setTimeout(() => {
            this.router.navigate(['/room', newRoom.id]);
          }, 1500);
        } else {
          // Phòng đã tồn tại, vào phòng đó
          this.currentRoom = existingRoom;
          this.router.navigate(['/room', roomId]);
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại.';
      }
      
      this.isLoading = false;
    }
  }


  async loadPublicRooms() {
    this.isLoadingRooms = true;
    const { data, error } = await this.databaseService.getPublicRooms();

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
