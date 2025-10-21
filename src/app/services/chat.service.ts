import { Injectable } from '@angular/core';

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
  private messageCallbacks: Map<string, ((message: Message) => void)[]> = new Map();
  private pollingIntervals: Map<string, number> = new Map();

  constructor() {}

  private async queryDatabase(query: string, params: any[] = []): Promise<any> {
    try {
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

  async fetchMessages(roomId: string): Promise<{ data: Message[] | null; error: any }> {
    try {
      // Get messages from the last 24 hours
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      
      const query = `
        SELECT * FROM messages 
        WHERE room_id = $1 AND created_at > $2
        ORDER BY created_at ASC
      `;
      const params = [roomId, twentyFourHoursAgo];
      
      const result = await this.queryDatabase(query, params);
      return { data: result || [], error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  async sendMessage(roomId: string, content: string, userId: string): Promise<{ data: Message | null; error: any }> {
    try {
      const query = `
        INSERT INTO messages (room_id, content, user_id, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *
      `;
      const params = [roomId, content, userId];
      
      const result = await this.queryDatabase(query, params);
      return { data: result[0] || null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  listenToRoom(roomId: string, callback: (message: Message) => void): void {
    // Add callback to the list
    if (!this.messageCallbacks.has(roomId)) {
      this.messageCallbacks.set(roomId, []);
    }
    this.messageCallbacks.get(roomId)!.push(callback);

    // Start polling if not already started
    if (!this.pollingIntervals.has(roomId)) {
      this.startPolling(roomId);
    }
  }

  private async startPolling(roomId: string): Promise<void> {
    let lastMessageTime = new Date().toISOString();

    const poll = async () => {
      try {
        const query = `
          SELECT * FROM messages 
          WHERE room_id = $1 AND created_at > $2
          ORDER BY created_at ASC
        `;
        const params = [roomId, lastMessageTime];
        
        const newMessages = await this.queryDatabase(query, params);
        
        if (newMessages && newMessages.length > 0) {
          // Update last message time
          lastMessageTime = newMessages[newMessages.length - 1].created_at;
          
          // Call all callbacks for each new message
          const callbacks = this.messageCallbacks.get(roomId) || [];
          newMessages.forEach((message: Message) => {
            callbacks.forEach(callback => callback(message));
          });
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Poll every 2 seconds
    const intervalId = window.setInterval(poll, 2000);
    this.pollingIntervals.set(roomId, intervalId);
  }

  unsubscribeFromRoom(roomId: string): void {
    // Clear callbacks
    this.messageCallbacks.delete(roomId);
    
    // Stop polling
    const intervalId = this.pollingIntervals.get(roomId);
    if (intervalId) {
      clearInterval(intervalId);
      this.pollingIntervals.delete(roomId);
    }
  }

  unsubscribeFromAllRooms(): void {
    // Clear all callbacks
    this.messageCallbacks.clear();
    
    // Stop all polling
    this.pollingIntervals.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    this.pollingIntervals.clear();
  }
}
