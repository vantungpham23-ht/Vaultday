import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

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
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  async createRoom(name: string, password?: string): Promise<{ data: Room | null; error: any }> {
    const { data, error } = await this.supabase
      .from('rooms')
      .insert([
        {
          name,
          password: password || null
        }
      ])
      .select()
      .single();

    return { data, error };
  }

  async getPublicRooms(): Promise<{ data: Room[] | null; error: any }> {
    const { data, error } = await this.supabase
      .from('rooms')
      .select('*')
      .is('password', null)
      .order('created_at', { ascending: false });

    return { data, error };
  }

  async getRoomById(id: string): Promise<{ data: Room | null; error: any }> {
    const { data, error } = await this.supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  }
}
