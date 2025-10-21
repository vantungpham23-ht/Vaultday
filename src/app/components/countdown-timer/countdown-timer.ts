import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownService, CountdownTime } from '../../services/countdown.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  imports: [CommonModule],
  template: `
    <div class="countdown-container">
      <div class="countdown-display">
        <div class="time-unit">
          <span class="time-value">{{ countdownTime.hours | number:'2.0-0' }}</span>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
          <span class="time-value">{{ countdownTime.minutes | number:'2.0-0' }}</span>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
          <span class="time-value">{{ countdownTime.seconds | number:'2.0-0' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .countdown-container {
      background: var(--bg-primary);
      border: 1px solid var(--border-neon);
      border-radius: 8px;
      padding: 20px;
      text-align: center;
    }

    .countdown-display {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      .time-unit {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-primary);
        border: 1px solid var(--border-neon);
        border-radius: 4px;
        width: 60px;
        height: 60px;

        .time-value {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-primary);
          font-family: monospace;
        }
      }

      .time-separator {
        font-size: 24px;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 5px;
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .countdown-container {
        padding: 15px;
      }

      .countdown-display {
        gap: 8px;

        .time-unit {
          width: 50px;
          height: 50px;

          .time-value {
            font-size: 20px;
          }
        }

        .time-separator {
          font-size: 20px;
        }
      }
    }

    @media (max-width: 480px) {
      .countdown-container {
        padding: 10px;
      }

      .countdown-display {
        gap: 6px;

        .time-unit {
          width: 40px;
          height: 40px;

          .time-value {
            font-size: 16px;
          }
        }

        .time-separator {
          font-size: 16px;
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
