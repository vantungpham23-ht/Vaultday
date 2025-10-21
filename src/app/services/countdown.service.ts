import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdownSubject = new BehaviorSubject<CountdownTime>({ hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 });
  private timezoneOffset = 0; // Will be set based on IP
  private timerInterval: any;

  constructor() {
    this.initializeTimezone();
    this.startCountdown();
  }

  getCountdown(): Observable<CountdownTime> {
    return this.countdownSubject.asObservable();
  }

  private async initializeTimezone() {
    try {
      // Get timezone from IP using a free API
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.timezone) {
        // Convert timezone to offset in minutes
        const now = new Date();
        const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
        const localTime = new Date(utc.toLocaleString("en-US", { timeZone: data.timezone }));
        this.timezoneOffset = (localTime.getTime() - utc.getTime()) / 60000;
        
        console.log('Timezone detected:', data.timezone, 'Offset:', this.timezoneOffset);
      }
    } catch (error) {
      console.warn('Could not detect timezone, using local time:', error);
      this.timezoneOffset = 0;
    }
  }

  private startCountdown() {
    this.timerInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
    
    // Initial update
    this.updateCountdown();
  }

  private updateCountdown() {
    const now = new Date();
    
    // Apply timezone offset
    const localTime = new Date(now.getTime() + (this.timezoneOffset * 60000));
    
    // Calculate time until next midnight
    const nextMidnight = new Date(localTime);
    nextMidnight.setHours(24, 0, 0, 0);
    
    const timeUntilMidnight = nextMidnight.getTime() - localTime.getTime();
    const totalSeconds = Math.floor(timeUntilMidnight / 1000);
    
    if (totalSeconds <= 0) {
      // Reset to next day
      nextMidnight.setDate(nextMidnight.getDate() + 1);
      const newTimeUntilMidnight = nextMidnight.getTime() - localTime.getTime();
      const newTotalSeconds = Math.floor(newTimeUntilMidnight / 1000);
      
      const hours = Math.floor(newTotalSeconds / 3600);
      const minutes = Math.floor((newTotalSeconds % 3600) / 60);
      const seconds = newTotalSeconds % 60;
      
      this.countdownSubject.next({ hours, minutes, seconds, totalSeconds: newTotalSeconds });
    } else {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      this.countdownSubject.next({ hours, minutes, seconds, totalSeconds });
    }
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
