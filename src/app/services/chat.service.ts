import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { EncryptionService, EncryptedMessage } from './encryption.service';

export interface Message {
  id: string;
  created_at: string;
  content: string;
  room_id: string;
  user_id: string | null;
  encrypted?: boolean;
  encryption_data?: EncryptedMessage;
  decryptedContent?: string; // Cache for decrypted content
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messageCallbacks: Map<string, ((message: Message) => void)[]> = new Map();
  private pollingIntervals: Map<string, number> = new Map();
  private mockMessages: Message[] = [];

  constructor(
    private environmentService: EnvironmentService,
    private encryptionService: EncryptionService
  ) {}

  private async queryDatabase(query: string, params: any[] = []): Promise<any> {
    if (this.environmentService.isLocalEnvironment()) {
      console.log('🔧 Local development: Skipping chat database query');
      return [];
    }
    
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

  async decryptAllMessages(messages: Message[], roomId: string): Promise<Message[]> {
    const decryptedMessages = await Promise.all(
      messages.map(async (message) => {
        if (message.decryptedContent) {
          return message; // Already decrypted
        }
        
        try {
          const decryptedContent = await this.decryptMessage(message, roomId);
          return { ...message, decryptedContent };
        } catch (error) {
          console.error('Failed to decrypt message:', error);
          return { ...message, decryptedContent: message.content };
        }
      })
    );
    
    return decryptedMessages;
  }

  async decryptMessage(message: Message, roomId: string): Promise<string> {
    try {
      if (!message.encrypted || !message.encryption_data) {
        return message.content; // Return as-is if not encrypted
      }
      
      const decryptedContent = await this.encryptionService.decryptMessage(
        message.encryption_data,
        roomId
      );
      
      console.log('🔓 Message decrypted successfully');
      return decryptedContent;
    } catch (error) {
      console.error('❌ Failed to decrypt message:', error);
      return `[Encrypted message - decryption failed]`;
    }
  }

  async fetchMessages(roomId: string): Promise<{ data: Message[] | null; error: any }> {
    if (this.environmentService.isLocalEnvironment()) {
      // Return mock messages for local development
      const mockMessages = this.mockMessages.filter(m => m.room_id === roomId);
      return { data: mockMessages, error: null };
    }
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
    if (this.environmentService.isLocalEnvironment()) {
      // Create mock message for local development with encryption
      let encryptedContent = content;
      let encryptionData: EncryptedMessage | undefined;
      
      try {
        // Encrypt the message
        encryptionData = await this.encryptionService.encryptMessage(content, roomId);
        encryptedContent = encryptionData.encryptedData;
        console.log('🔐 Message encrypted for local development');
      } catch (error) {
        console.warn('⚠️ Encryption failed, sending unencrypted message:', error);
      }
      
      const mockMessage: Message = {
        id: `mock-msg-${Date.now()}`,
        room_id: roomId,
        content: encryptedContent,
        user_id: userId,
        created_at: new Date().toISOString(),
        encrypted: encryptionData !== undefined,
        encryption_data: encryptionData
      };
      
      this.mockMessages.push(mockMessage);
      
      // Simulate real-time message delivery
      setTimeout(() => {
        const callbacks = this.messageCallbacks.get(roomId) || [];
        callbacks.forEach(callback => callback(mockMessage));
      }, 100);
      
      return { data: mockMessage, error: null };
    }
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
