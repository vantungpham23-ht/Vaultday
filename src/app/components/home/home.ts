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
    console.log('Testing Netlify Functions...');
    const connectionTest = await this.databaseService.testConnection();
    console.log('Connection test result:', connectionTest);
    
    if (connectionTest.ok) {
      console.log('✅ Netlify Functions working!');
      this.loadPublicRooms();
    } else {
      console.error('❌ Netlify Functions failed:', connectionTest.error);
      this.errorMessage = 'Không thể kết nối server. Vui lòng thử lại sau.';
    }
  }

  async onJoinRoom() {
    if (this.joinRoomForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { roomId } = this.joinRoomForm.value;
      
      try {
        // Kiểm tra xem phòng có tồn tại không (theo ID)
        const { data: existingRoomById, error: idError } = await this.databaseService.getRoomById(roomId);
        
        if (idError || !existingRoomById) {
          // Không tìm thấy phòng theo ID, kiểm tra theo tên
          const roomName = `Room-${roomId}`;
          const { data: existingRoomByName, error: nameError } = await this.databaseService.getRoomByName(roomName);
          
          if (nameError || !existingRoomByName) {
            // Phòng không tồn tại, tạo phòng mới với mã code này
            const { data: newRoom, error: createError } = await this.databaseService.createRoom(roomName, undefined, true);
            
            if (createError || !newRoom) {
              console.error('Error creating room:', createError);
              this.errorMessage = 'Không thể tạo phòng. Vui lòng thử lại.';
              this.isLoading = false;
              return;
            }
            
            this.successMessage = 'Phòng mới đã được tạo với mã này!';
            this.generatedRoomCode = newRoom.id; // Sử dụng ID thực tế của phòng
            this.currentRoom = newRoom;
            
            // Tự động chuyển vào phòng chat
            setTimeout(() => {
              this.router.navigate(['/room', newRoom.id]);
            }, 1500);
          } else {
            // Phòng đã tồn tại với tên này, join vào phòng đó
            this.currentRoom = existingRoomByName;
            this.successMessage = 'Đã tham gia phòng hiện có!';
            setTimeout(() => {
              this.router.navigate(['/room', existingRoomByName.id]);
            }, 1000);
          }
        } else {
          // Phòng đã tồn tại theo ID, vào phòng đó
          this.currentRoom = existingRoomById;
          this.router.navigate(['/room', existingRoomById.id]); // Sử dụng ID thực tế
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

  trackByRoomId(index: number, room: Room): string {
    return room.id;
  }
}
