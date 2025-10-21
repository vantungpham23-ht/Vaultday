import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'vaultday-theme';
  private isDarkMode = false;

  constructor() {
    // Load theme from localStorage or default to light
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem(this.THEME_KEY, this.isDarkMode ? 'dark' : 'light');
  }

  setTheme(isDark: boolean): void {
    this.isDarkMode = isDark;
    this.applyTheme();
    localStorage.setItem(this.THEME_KEY, this.isDarkMode ? 'dark' : 'light');
  }

  isDark(): boolean {
    return this.isDarkMode;
  }

  private applyTheme(): void {
    const root = document.documentElement;
    
    if (this.isDarkMode) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }
}
