import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundAnimationService {
  private mouseFollowers: HTMLElement[] = [];
  private particles: HTMLElement[] = [];
  private glowEffects: HTMLElement[] = [];
  private isInitialized = false;

  private icons = ['✨', '💫', '⭐', '🌟', '💎', '🔮', '💜', '🟣', '💙', '🔵'];

  constructor() {}

  initializeBackgroundAnimation(): void {
    if (this.isInitialized) return;
    
    this.createMouseFollowers();
    this.createFloatingParticles();
    this.createGlowEffects();
    this.setupMouseTracking();
    
    this.isInitialized = true;
  }

  private createMouseFollowers(): void {
    for (let i = 0; i < 8; i++) {
      const follower = document.createElement('div');
      follower.className = 'mouse-follower';
      follower.textContent = this.icons[i % this.icons.length];
      follower.style.left = `${Math.random() * window.innerWidth}px`;
      follower.style.top = `${Math.random() * window.innerHeight}px`;
      follower.style.opacity = '0';
      follower.style.transition = 'opacity 0.3s ease-out';
      document.body.appendChild(follower);
      this.mouseFollowers.push(follower);
    }
  }

  private createFloatingParticles(): void {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = `${Math.random() * window.innerWidth}px`;
      particle.style.top = `${Math.random() * window.innerHeight}px`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      document.body.appendChild(particle);
      this.particles.push(particle);
    }
  }

  private createGlowEffects(): void {
    for (let i = 0; i < 3; i++) {
      const glow = document.createElement('div');
      glow.className = 'glow-effect';
      glow.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
      glow.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
      document.body.appendChild(glow);
      this.glowEffects.push(glow);
    }
  }

  private setupMouseTracking(): void {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isMoving = false;
    let movementTimer: any = null;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Detect if mouse is moving
      if (Math.abs(mouseX - lastMouseX) > 2 || Math.abs(mouseY - lastMouseY) > 2) {
        isMoving = true;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        
        // Clear existing timer
        if (movementTimer) {
          clearTimeout(movementTimer);
        }
        
        // Set timer to stop movement after 500ms
        movementTimer = setTimeout(() => {
          isMoving = false;
        }, 500);
      }
    });

    const animateFollowers = () => {
      // Circular orbit around mouse
      const time = Date.now() * 0.001; // Convert to seconds
      const radius = 60; // Distance from mouse
      
      this.mouseFollowers.forEach((follower, index) => {
        // Calculate angle for each follower (evenly distributed around circle)
        const angle = (time * 0.5) + (index * Math.PI * 2 / this.mouseFollowers.length);
        
        // Calculate position in circle
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        
        follower.style.left = `${mouseX + offsetX}px`;
        follower.style.top = `${mouseY + offsetY}px`;
        
        // Show/hide based on movement
        if (isMoving) {
          follower.style.opacity = '0.8';
        } else {
          follower.style.opacity = '0.3'; // Keep visible but dimmer when not moving
        }
        
        // Add rotation and scale based on position in orbit
        const rotation = angle * (180 / Math.PI); // Convert to degrees
        const scale = isMoving ? 1.2 : 0.9;
        follower.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        
        // Add pulsing effect
        const pulse = Math.sin(time * 2 + index) * 0.2 + 1;
        follower.style.transform += ` scale(${pulse})`;
      });

      requestAnimationFrame(animateFollowers);
    };

    animateFollowers();
  }

  destroyBackgroundAnimation(): void {
    // Remove all created elements
    [...this.mouseFollowers, ...this.particles, ...this.glowEffects].forEach(el => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });

    // Clear arrays
    this.mouseFollowers = [];
    this.particles = [];
    this.glowEffects = [];
    
    this.isInitialized = false;
  }

  // Method to add temporary sparkle effect
  createSparkleEffect(x: number, y: number): void {
    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement('div');
      sparkle.textContent = '✨';
      sparkle.style.position = 'fixed';
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '1000';
      sparkle.style.fontSize = '1rem';
      sparkle.style.opacity = '0.8';
      
      // Random direction animation
      const angle = (i / 8) * Math.PI * 2;
      const distance = 50 + Math.random() * 50;
      const endX = x + Math.cos(angle) * distance;
      const endY = y + Math.sin(angle) * distance;
      
      sparkle.style.transition = 'all 1s ease-out';
      sparkle.style.transform = `translate(${endX - x}px, ${endY - y}px)`;
      sparkle.style.opacity = '0';
      
      document.body.appendChild(sparkle);
      
      // Remove after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 1000);
    }
  }
}
