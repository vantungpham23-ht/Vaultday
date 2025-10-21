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
      // Check if we have cached timezone data
      const cachedData = localStorage.getItem('timezone_data');
      const cacheTime = localStorage.getItem('timezone_cache_time');
      
      if (cachedData && cacheTime) {
        const cacheAge = Date.now() - parseInt(cacheTime);
        // Use cache if it's less than 1 hour old
        if (cacheAge < 60 * 60 * 1000) {
          const data = JSON.parse(cachedData);
          this.setTimezoneFromData(data);
          console.log('Using cached timezone:', data.timezone);
          return;
        }
      }

      // Try to get timezone from IP using a free API with fallback
      let data = null;
      
      try {
        const response = await fetch('https://ipapi.co/json/', {
          headers: {
            'User-Agent': 'VaultDay/1.0'
          }
        });
        
        if (response.ok) {
          data = await response.json();
        }
      } catch (error) {
        console.warn('ipapi.co failed, trying fallback:', error);
      }

      // Fallback to browser timezone if API fails
      if (!data || !data.timezone) {
        data = {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          utc_offset: new Date().getTimezoneOffset() * -1
        };
        console.log('Using browser timezone as fallback:', data.timezone);
      }

      // Cache the result
      localStorage.setItem('timezone_data', JSON.stringify(data));
      localStorage.setItem('timezone_cache_time', Date.now().toString());
      
      this.setTimezoneFromData(data);
      
    } catch (error) {
      console.warn('Could not detect timezone, using local time:', error);
      this.timezoneOffset = 0;
    }
  }

  private setTimezoneFromData(data: any) {
    if (data.timezone) {
      // Convert timezone to offset in minutes
      const now = new Date();
      const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
      const localTime = new Date(utc.toLocaleString("en-US", { timeZone: data.timezone }));
      this.timezoneOffset = (localTime.getTime() - utc.getTime()) / 60000;
      
      console.log('Timezone detected:', data.timezone, 'Offset:', this.timezoneOffset);
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
