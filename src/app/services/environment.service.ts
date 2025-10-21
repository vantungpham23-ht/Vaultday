import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private isLocal = false;

  constructor() {
    // Detect if running locally
    this.isLocal = this.detectLocalEnvironment();
  }

  private detectLocalEnvironment(): boolean {
    // Check if running on localhost
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('ngrok');
    }
    return false;
  }

  isLocalEnvironment(): boolean {
    return this.isLocal;
  }

  isProductionEnvironment(): boolean {
    return !this.isLocal;
  }

  getApiBaseUrl(): string {
    if (this.isLocal) {
      return 'http://localhost:8888'; // Netlify Dev default port
    }
    return ''; // Production uses relative URLs
  }
}
