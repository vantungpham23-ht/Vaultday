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

  private async queryDatabase(query: string, params: any[] = []): Promise<any> {
    try {
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

      const result = await response.json();
      
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
