import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly USERNAME_KEY = 'vaultday_username';
  private readonly USER_ID_KEY = 'vaultday_user_id';

  constructor() {}

  // Username methods
  saveUsername(username: string): void {
    try {
      localStorage.setItem(this.USERNAME_KEY, username);
    } catch (error) {
      console.warn('Failed to save username to localStorage:', error);
    }
  }

  getUsername(): string | null {
    try {
      return localStorage.getItem(this.USERNAME_KEY);
    } catch (error) {
      console.warn('Failed to get username from localStorage:', error);
      return null;
    }
  }

  clearUsername(): void {
    try {
      localStorage.removeItem(this.USERNAME_KEY);
    } catch (error) {
      console.warn('Failed to clear username from localStorage:', error);
    }
  }

  // User ID methods
  saveUserId(userId: string): void {
    try {
      localStorage.setItem(this.USER_ID_KEY, userId);
    } catch (error) {
      console.warn('Failed to save user ID to localStorage:', error);
    }
  }

  getUserId(): string | null {
    try {
      return localStorage.getItem(this.USER_ID_KEY);
    } catch (error) {
      console.warn('Failed to get user ID from localStorage:', error);
      return null;
    }
  }

  clearUserId(): void {
    try {
      localStorage.removeItem(this.USER_ID_KEY);
    } catch (error) {
      console.warn('Failed to clear user ID from localStorage:', error);
    }
  }

  // Clear all user data
  clearAllUserData(): void {
    this.clearUsername();
    this.clearUserId();
  }

  // Check if user data exists
  hasUserData(): boolean {
    return this.getUsername() !== null && this.getUserId() !== null;
  }
}
