import { Injectable } from '@angular/core';

export interface Room {
  id: string;
  created_at: string;
  name: string;
  password: string | null;
  created_by: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  constructor() {}

  // Test database connection
  async testConnection(): Promise<{ ok: boolean; data?: any; error?: any }> {
    try {
      const response = await fetch('/.netlify/functions/test-neon', {
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
    try {
      console.log('Making database query:', { query, params });
      
      const response = await fetch('/.netlify/functions/db-query', {
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

  async createRoom(name: string, password?: string): Promise<{ data: Room | null; error: any }> {
    try {
      const query = `
        INSERT INTO rooms (name, password, created_at)
        VALUES ($1, $2, NOW())
        RETURNING *
      `;
      const params = [name, password || null];
      
      const result = await this.queryDatabase(query, params);
      return { data: result[0] || null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getPublicRooms(): Promise<{ data: Room[] | null; error: any }> {
    try {
      const query = `
        SELECT * FROM rooms 
        WHERE password IS NULL 
        ORDER BY created_at DESC
      `;
      
      const result = await this.queryDatabase(query);
      return { data: result || [], error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async getRoomById(id: string): Promise<{ data: Room | null; error: any }> {
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
}
