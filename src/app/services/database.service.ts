import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { MockDatabaseService } from './mock-database.service';

export interface Room {
  id: string;
  created_at: string;
  name: string;
  password: string | null;
  created_by: string | null;
  is_public: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    private environmentService: EnvironmentService,
    private mockDatabaseService: MockDatabaseService
  ) {}

  // Test database connection
  async testConnection(): Promise<{ ok: boolean; data?: any; error?: any }> {
    if (this.environmentService.isLocalEnvironment()) {
      console.log('🔧 Using mock database service for local development');
      return this.mockDatabaseService.testConnection();
    }
    try {
      const response = await fetch('/.netlify/functions/db-pg', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Connection test error:', error);
      return { ok: false, error: error };
    }
  }

  // Run daily cleanup (for testing purposes)
  async runDailyCleanup(): Promise<{ ok: boolean; data?: any; error?: any }> {
    try {
      const response = await fetch('/.netlify/functions/daily-cleanup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Daily cleanup error:', error);
      return { ok: false, error: error };
    }
  }

  private async queryDatabase(query: string, params: any[] = []): Promise<any> {
    if (this.environmentService.isLocalEnvironment()) {
      console.log('🔧 Local development: Skipping database query');
      return [];
    }
    
    try {
      console.log('Making database query:', { query, params });
      
      const response = await fetch('/.netlify/functions/db-pg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          params
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Query result:', result);
      
      if (!result.ok) {
        throw new Error(result.error || 'Database query failed');
      }

      return result.data;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  async createRoom(name: string, password?: string, isPublic: boolean = true): Promise<{ data: Room | null; error: any }> {
    if (this.environmentService.isLocalEnvironment()) {
      return this.mockDatabaseService.createRoom(name, password, isPublic);
    }
    try {
      const query = `
        INSERT INTO rooms (name, password, is_public, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *
      `;
      const params = [name, password || null, isPublic];
      
      const result = await this.queryDatabase(query, params);
      return { data: result[0] || null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getRoomByName(name: string): Promise<{ data: Room | null; error: any }> {
    if (this.environmentService.isLocalEnvironment()) {
      return this.mockDatabaseService.getRoomByName(name);
    }
    try {
      const query = `
        SELECT * FROM rooms 
        WHERE name = $1
        ORDER BY created_at DESC
        LIMIT 1
      `;
      const params = [name];
      
      const result = await this.queryDatabase(query, params);
      return { data: result[0] || null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getRoomById(id: string): Promise<{ data: Room | null; error: any }> {
    if (this.environmentService.isLocalEnvironment()) {
      return this.mockDatabaseService.getRoomById(id);
    }
    try {
      const query = `
        SELECT * FROM rooms 
        WHERE id = $1
      `;
      const params = [id];
      
      const result = await this.queryDatabase(query, params);
      return { data: result[0] || null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getPublicRooms(): Promise<{ data: Room[] | null; error: any }> {
    if (this.environmentService.isLocalEnvironment()) {
      return this.mockDatabaseService.getPublicRooms();
    }
    try {
      const query = `
        SELECT * FROM rooms 
        WHERE is_public = true 
        ORDER BY created_at DESC
      `;
      
      const result = await this.queryDatabase(query);
      return { data: result || [], error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async updateRoomVisibility(roomId: string, isPublic: boolean): Promise<{ data: Room | null; error: any }> {
    if (this.environmentService.isLocalEnvironment()) {
      return this.mockDatabaseService.updateRoomVisibility(roomId, isPublic);
    }
    try {
      const query = `
        UPDATE rooms 
        SET is_public = $1 
        WHERE id = $2 
        RETURNING *
      `;
      const params = [isPublic, roomId];
      
      const result = await this.queryDatabase(query, params);
      return { data: result[0] || null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}
