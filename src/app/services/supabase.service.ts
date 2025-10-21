import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../core/supabase.client';

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

  get client(): SupabaseClient {
    return supabase;
  }

  async createRoom(name: string, password?: string): Promise<{ data: Room | null; error: any }> {
    const { data, error } = await this.client
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
    const { data, error } = await this.client
      .from('rooms')
      .select('*')
      .is('password', null)
      .order('created_at', { ascending: false });

    return { data, error };
  }

  async getRoomById(id: string): Promise<{ data: Room | null; error: any }> {
    const { data, error } = await this.client
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  }
}
