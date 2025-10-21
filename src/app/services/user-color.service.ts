import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserColorService {
  private userColors: Map<string, string> = new Map();
  private colorPalette: string[] = [
    '#8b5cf6', // Purple
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#3b82f6', // Blue
    '#84cc16', // Lime
    '#f97316', // Orange
    '#ec4899', // Pink
    '#6366f1', // Indigo
    '#14b8a6', // Teal
    '#a855f7'  // Violet
  ];

  constructor() {}

  // Get or assign a color for a user
  getUserColor(userId: string): string {
    if (!this.userColors.has(userId)) {
      // Assign a color based on user ID hash
      const hash = this.hashString(userId);
      const colorIndex = hash % this.colorPalette.length;
      this.userColors.set(userId, this.colorPalette[colorIndex]);
    }
    return this.userColors.get(userId)!;
  }

  // Get a lighter version of the color for backgrounds
  getUserColorLight(userId: string): string {
    const color = this.getUserColor(userId);
    return this.lightenColor(color, 0.2);
  }

  // Get a darker version of the color for borders
  getUserColorDark(userId: string): string {
    const color = this.getUserColor(userId);
    return this.darkenColor(color, 0.3);
  }

  // Generate a consistent hash from string
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Lighten a color by a percentage
  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent * 100);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  // Darken a color by a percentage
  private darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent * 100);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return '#' + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  }

  // Clear all user colors (useful for testing)
  clearUserColors(): void {
    this.userColors.clear();
  }

  // Get all assigned colors
  getAllUserColors(): Map<string, string> {
    return new Map(this.userColors);
  }
}
