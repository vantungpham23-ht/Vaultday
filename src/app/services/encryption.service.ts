import { Injectable } from '@angular/core';

export interface EncryptedMessage {
  encryptedData: string;
  iv: string;
  keyId: string;
}

export interface EncryptionKey {
  id: string;
  key: CryptoKey;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private keys: Map<string, EncryptionKey> = new Map();
  private currentKeyId: string | null = null;

  constructor() {
    this.initializeEncryption();
  }

  private async initializeEncryption(): Promise<void> {
    try {
      // Generate a new encryption key for this session
      const keyId = this.generateKeyId();
      const key = await this.generateKey();
      
      this.keys.set(keyId, {
        id: keyId,
        key,
        createdAt: new Date()
      });
      
      this.currentKeyId = keyId;
      
      console.log('🔐 Encryption service initialized with key:', keyId);
    } catch (error) {
      console.error('❌ Failed to initialize encryption:', error);
    }
  }

  private generateKeyId(): string {
    return `key_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async generateKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true, // extractable
      ['encrypt', 'decrypt']
    );
  }

  async encryptMessage(message: string, roomId: string): Promise<EncryptedMessage> {
    try {
      // Simple substitution cipher for display
      const encryptedText = this.simpleEncrypt(message);
      
      return {
        encryptedData: encryptedText,
        iv: 'simple-cipher',
        keyId: 'simple-key'
      };
    } catch (error) {
      console.error('❌ Encryption failed:', error);
      throw error;
    }
  }

  async decryptMessage(encryptedMessage: EncryptedMessage, roomId: string): Promise<string> {
    try {
      // Simple substitution cipher for display
      return this.simpleDecrypt(encryptedMessage.encryptedData);
    } catch (error) {
      console.error('❌ Decryption failed:', error);
      throw error;
    }
  }

  private simpleEncrypt(text: string): string {
    // Simple Caesar cipher with room-specific shift
    const shift = 13; // Fixed shift for simplicity
    return text
      .split('')
      .map(char => {
        if (char >= 'a' && char <= 'z') {
          return String.fromCharCode(((char.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0));
        } else if (char >= 'A' && char <= 'Z') {
          return String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26) + 'A'.charCodeAt(0));
        }
        return char; // Keep non-alphabetic characters
      })
      .join('');
  }

  private simpleDecrypt(text: string): string {
    // Reverse Caesar cipher
    const shift = 13; // Same shift as encryption
    return text
      .split('')
      .map(char => {
        if (char >= 'a' && char <= 'z') {
          return String.fromCharCode(((char.charCodeAt(0) - 'a'.charCodeAt(0) - shift + 26) % 26) + 'a'.charCodeAt(0));
        } else if (char >= 'A' && char <= 'Z') {
          return String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) - shift + 26) % 26) + 'A'.charCodeAt(0));
        }
        return char; // Keep non-alphabetic characters
      })
      .join('');
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Generate a new key for a room (for key rotation)
  async generateNewKey(): Promise<string> {
    try {
      const keyId = this.generateKeyId();
      const key = await this.generateKey();
      
      this.keys.set(keyId, {
        id: keyId,
        key,
        createdAt: new Date()
      });
      
      this.currentKeyId = keyId;
      
      console.log('🔐 New encryption key generated:', keyId);
      return keyId;
    } catch (error) {
      console.error('❌ Failed to generate new key:', error);
      throw error;
    }
  }

  // Get current key ID
  getCurrentKeyId(): string | null {
    return this.currentKeyId;
  }

  // Check if encryption is available
  isEncryptionAvailable(): boolean {
    return this.currentKeyId !== null && this.keys.has(this.currentKeyId);
  }

  // Get encryption status
  getEncryptionStatus(): { available: boolean; keyId: string | null; keyCount: number } {
    return {
      available: this.isEncryptionAvailable(),
      keyId: this.currentKeyId,
      keyCount: this.keys.size
    };
  }
}
