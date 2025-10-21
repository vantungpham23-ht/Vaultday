import { Injectable } from '@angular/core';
import { Room } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class MockDatabaseService {
  private mockRooms: Room[] = [
    {
      id: 'mock-room-1',
      name: 'Room-ABC123',
      created_at: new Date().toISOString(),
      password: null,
      created_by: null,
      is_public: true
    },
    {
      id: 'mock-room-2', 
      name: 'Room-DEF456',
      created_at: new Date().toISOString(),
      password: null,
      created_by: null,
      is_public: true
    }
  ];

  private mockMessages: any[] = [];

  async testConnection(): Promise<{ ok: boolean; error?: any }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true });
      }, 500);
    });
  }

  async createRoom(name: string, password?: string, isPublic: boolean = true): Promise<{ data: Room | null; error: any }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRoom: Room = {
          id: `mock-room-${Date.now()}`,
          name,
          created_at: new Date().toISOString(),
          password: password || null,
          created_by: null,
          is_public: isPublic
        };
        
        this.mockRooms.push(newRoom);
        resolve({ data: newRoom, error: null });
      }, 300);
    });
  }

  async getRoomById(id: string): Promise<{ data: Room | null; error: any }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const room = this.mockRooms.find(r => r.id === id);
        resolve({ data: room || null, error: null });
      }, 200);
    });
  }

  async getRoomByName(name: string): Promise<{ data: Room | null; error: any }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const room = this.mockRooms.find(r => r.name === name);
        resolve({ data: room || null, error: null });
      }, 200);
    });
  }

  async getPublicRooms(): Promise<{ data: Room[] | null; error: any }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const publicRooms = this.mockRooms.filter(r => r.is_public);
        resolve({ data: publicRooms, error: null });
      }, 200);
    });
  }

  async updateRoomVisibility(roomId: string, isPublic: boolean): Promise<{ data: Room | null; error: any }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const room = this.mockRooms.find(r => r.id === roomId);
        if (room) {
          room.is_public = isPublic;
          resolve({ data: room, error: null });
        } else {
          resolve({ data: null, error: 'Room not found' });
        }
      }, 200);
    });
  }
}
