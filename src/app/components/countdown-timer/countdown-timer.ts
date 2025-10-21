import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownService, CountdownTime } from '../../services/countdown.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  imports: [CommonModule],
  template: `
    <div class="countdown-container">
      <div class="countdown-header">
        <span class="countdown-icon">⏰</span>
        <span class="countdown-title">Đếm ngược đến 0h</span>
      </div>
      <div class="countdown-display">
        <div class="time-unit">
          <span class="time-value">{{ countdownTime.hours | number:'2.0-0' }}</span>
          <span class="time-label">Giờ</span>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
          <span class="time-value">{{ countdownTime.minutes | number:'2.0-0' }}</span>
          <span class="time-label">Phút</span>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
          <span class="time-value">{{ countdownTime.seconds | number:'2.0-0' }}</span>
          <span class="time-label">Giây</span>
        </div>
      </div>
      <div class="countdown-info">
        <p class="info-text">Tin nhắn sẽ tự động xoá khi đồng hồ điểm 0h</p>
      </div>
    </div>
  `,
  styles: [`
    .countdown-container {
      background: var(--bg-card);
      border: 2px solid var(--border-neon);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      text-align: center;
      box-shadow: var(--neon-glow-sm);
      animation: neonPulse 3s ease-in-out infinite;
    }

    .countdown-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-md);

      .countdown-icon {
        font-size: var(--font-size-lg);
        color: var(--neon-primary);
      }

      .countdown-title {
        font-size: var(--font-size-sm);
        font-weight: 600;
        color: var(--text-primary);
        text-shadow: var(--neon-glow-sm);
      }
    }

    .countdown-display {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-md);

      .time-unit {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-xs);

        .time-value {
          font-size: var(--font-size-2xl);
          font-weight: 700;
          color: var(--neon-primary);
          text-shadow: var(--neon-glow-md);
          font-family: var(--font-family);
          min-width: 2ch;
        }

        .time-label {
          font-size: var(--font-size-xs);
          color: var(--text-secondary);
          font-weight: 500;
        }
      }

      .time-separator {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--neon-primary);
        text-shadow: var(--neon-glow-sm);
        margin: 0 var(--space-xs);
      }
    }

    .countdown-info {
      .info-text {
        font-size: var(--font-size-xs);
        color: var(--text-tertiary);
        margin: 0;
        font-style: italic;
        opacity: 0.8;
      }
    }

    @keyframes neonPulse {
      0%, 100% { 
        box-shadow: var(--neon-glow-sm);
        border-color: var(--border-neon);
      }
      50% { 
        box-shadow: var(--neon-glow-md);
        border-color: var(--neon-accent);
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .countdown-container {
        padding: var(--space-md);
      }

      .countdown-display {
        .time-unit {
          .time-value {
            font-size: var(--font-size-xl);
          }
        }

        .time-separator {
          font-size: var(--font-size-xl);
        }
      }
    }

    @media (max-width: 480px) {
      .countdown-display {
        gap: var(--space-xs);

        .time-unit {
          .time-value {
            font-size: var(--font-size-lg);
          }
        }

        .time-separator {
          font-size: var(--font-size-lg);
        }
      }
    }
  `]
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  countdownTime: CountdownTime = { hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
  private subscription: Subscription = new Subscription();

  constructor(private countdownService: CountdownService) {}

  ngOnInit() {
    this.subscription = this.countdownService.getCountdown().subscribe(
      (time: CountdownTime) => {
        this.countdownTime = time;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
