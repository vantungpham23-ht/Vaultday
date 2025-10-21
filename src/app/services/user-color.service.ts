import { Injectable } from '@angular/core';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class UserColorService {
  private userColors: Map<string, string> = new Map();
  
  // Dark mode colors - lighter shades for contrast on dark background
  private darkModeColors: string[] = [
    '#ffffff', // Pure white
    '#f8fafc', // Slate 50
    '#e2e8f0', // Slate 200
    '#cbd5e1', // Slate 300
    '#94a3b8', // Slate 400
    '#64748b', // Slate 500
    '#f1f5f9', // Slate 100
    '#d1d5db', // Gray 300
    '#e5e7eb', // Gray 200
    '#f3f4f6', // Gray 100
    '#f9fafb', // Gray 50
    '#ffffff'  // Pure white (duplicate for more users)
  ];
  
  // Light mode colors - darker shades for contrast on light background
  private lightModeColors: string[] = [
    '#1f2937', // Gray 800
    '#374151', // Gray 700
    '#4b5563', // Gray 600
    '#6b7280', // Gray 500
    '#9ca3af', // Gray 400
    '#111827', // Gray 900
    '#1e293b', // Slate 800
    '#334155', // Slate 700
    '#475569', // Slate 600
    '#0f172a', // Slate 900
    '#1a202c', // Custom dark
    '#2d3748'  // Custom darker
  ];

  constructor(private themeService: ThemeService) {}

  // Get current color palette based on theme
  private getCurrentColorPalette(): string[] {
    return this.themeService.isDark() ? this.darkModeColors : this.lightModeColors;
  }

  // Get or assign a color for a user with theme-aware distribution
  getUserColor(userId: string): string {
    if (!this.userColors.has(userId)) {
      // Assign a color based on user ID hash with theme-aware distribution
      const hash = this.hashString(userId);
      const colorPalette = this.getCurrentColorPalette();
      const colorIndex = hash % colorPalette.length;
      this.userColors.set(userId, colorPalette[colorIndex]);
      
      // Debug log to track color assignment
      const theme = this.themeService.isDark() ? 'dark' : 'light';
      console.log(`🎨 Assigned ${theme} color ${colorPalette[colorIndex]} to user ${userId.substring(0, 8)}...`);
    }
    return this.userColors.get(userId)!;
  }

  // Get a lighter version of the color for backgrounds with monochrome optimization
  getUserColorLight(userId: string): string {
    const color = this.getUserColor(userId);
    // For monochrome colors, ensure good contrast
    const lightColor = this.lightenColor(color, 0.3);
    return lightColor;
  }

  // Get a darker version of the color for borders with monochrome optimization
  getUserColorDark(userId: string): string {
    const color = this.getUserColor(userId);
    // For monochrome colors, ensure good contrast
    const darkColor = this.darkenColor(color, 0.4);
    return darkColor;
  }

  // Generate a consistent hash from string with better distribution
  private hashString(str: string): number {
    let hash = 0;
    if (str.length === 0) return hash;
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Add additional mixing for better distribution
    hash = hash ^ (hash >>> 16);
    hash = hash * 0x85ebca6b;
    hash = hash ^ (hash >>> 13);
    hash = hash * 0xc2b2ae35;
    hash = hash ^ (hash >>> 16);
    
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
    console.log('🧹 Cleared all user colors');
  }

  // Refresh colors when theme changes
  refreshColorsForThemeChange(): void {
    const currentUsers = Array.from(this.userColors.keys());
    this.userColors.clear();
    
    // Reassign colors with new theme palette
    currentUsers.forEach(userId => {
      this.getUserColor(userId);
    });
    
    console.log(`🔄 Refreshed colors for ${currentUsers.length} users with ${this.themeService.isDark() ? 'dark' : 'light'} theme`);
  }

  // Get all assigned colors
  getAllUserColors(): Map<string, string> {
    return new Map(this.userColors);
  }

  // Get color statistics for debugging
  getColorStats(): { totalUsers: number; colorDistribution: Record<string, number> } {
    const distribution: Record<string, number> = {};
    
    for (const [userId, color] of this.userColors) {
      distribution[color] = (distribution[color] || 0) + 1;
    }
    
    return {
      totalUsers: this.userColors.size,
      colorDistribution: distribution
    };
  }
}
