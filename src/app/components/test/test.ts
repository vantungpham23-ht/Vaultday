import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="background-color: white; color: black; padding: 20px; min-height: 100vh;">
      <h1>VaultDay Test Page</h1>
      <p>If you can see this, the app is working!</p>
      <p>Current time: {{ currentTime }}</p>
    </div>
  `
})
export class TestComponent {
  currentTime = new Date().toLocaleString();
}
