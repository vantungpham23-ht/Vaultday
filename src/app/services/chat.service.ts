import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface Message {
  id: string;
  created_at: string;
  content: string;
  room_id: string;
  user_id: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private channels: Map<string, RealtimeChannel> = new Map();

  constructor(private supabaseService: SupabaseService) {}

  async fetchMessages(roomId: string): Promise<{ data: Message[] | null; error: any }> {
    // Get messages from the last 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    
    const { data, error } = await this.supabaseService.client
      .from('messages')
      .select('*')
      .eq('room_id', roomId)
      .gt('created_at', twentyFourHoursAgo)
      .order('created_at', { ascending: true });

    return { data, error };
  }

  async sendMessage(roomId: string, content: string, userId: string): Promise<{ data: Message | null; error: any }> {
    const { data, error } = await this.supabaseService.client
      .from('messages')
      .insert([
        {
          room_id: roomId,
          content: content,
          user_id: userId
        }
      ])
      .select()
      .single();

    return { data, error };
  }

  listenToRoom(roomId: string, callback: (message: Message) => void): RealtimeChannel {
    // Clean up existing channel if it exists
    if (this.channels.has(roomId)) {
      this.channels.get(roomId)?.unsubscribe();
    }

    const channel = this.supabaseService.client
      .channel(`room-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();

    this.channels.set(roomId, channel);
    return channel;
  }

  unsubscribeFromRoom(roomId: string): void {
    const channel = this.channels.get(roomId);
    if (channel) {
      channel.unsubscribe();
      this.channels.delete(roomId);
    }
  }

  unsubscribeFromAllRooms(): void {
    this.channels.forEach((channel) => {
      channel.unsubscribe();
    });
    this.channels.clear();
  }
}
