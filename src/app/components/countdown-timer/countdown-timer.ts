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
      position: relative;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
      border-radius: 20px;
      padding: 40px 60px;
      text-align: center;
      overflow: hidden;
      box-shadow: 
        0 0 30px rgba(0, 255, 255, 0.3),
        0 0 60px rgba(255, 0, 255, 0.2),
        0 0 90px rgba(255, 100, 0, 0.1);
      animation: cosmicGlow 4s ease-in-out infinite;
    }

    .countdown-container::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, 
        #00ffff 0%, 
        #0080ff 25%, 
        #ff0080 50%, 
        #ff4000 75%, 
        #8000ff 100%);
      border-radius: 22px;
      z-index: -1;
      animation: neonRotate 3s linear infinite;
    }

    .countdown-container::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(255, 100, 0, 0.05) 0%, transparent 50%);
      border-radius: 20px;
      pointer-events: none;
    }

    .countdown-display {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      position: relative;
      z-index: 1;

      .time-unit {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 0;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        width: 80px;
        height: 80px;
        min-width: 80px;
        min-height: 80px;
        position: relative;
        overflow: hidden;

        .time-value {
          font-size: 48px;
          font-weight: 700;
          color: #e0e0e0;
          text-shadow: 
            0 0 10px rgba(255, 255, 255, 0.5),
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 30px rgba(255, 255, 255, 0.1);
          font-family: 'Poppins', monospace;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          line-height: 1;
          white-space: nowrap;
          letter-spacing: 2px;
        }
      }

      .time-separator {
        font-size: 48px;
        font-weight: 700;
        color: #e0e0e0;
        text-shadow: 
          0 0 10px rgba(255, 255, 255, 0.5),
          0 0 20px rgba(255, 255, 255, 0.3);
        margin: 0 5px;
        animation: separatorPulse 2s ease-in-out infinite;
      }
    }

    @keyframes cosmicGlow {
      0%, 100% { 
        box-shadow: 
          0 0 30px rgba(0, 255, 255, 0.3),
          0 0 60px rgba(255, 0, 255, 0.2),
          0 0 90px rgba(255, 100, 0, 0.1);
      }
      50% { 
        box-shadow: 
          0 0 40px rgba(255, 0, 255, 0.4),
          0 0 80px rgba(255, 100, 0, 0.3),
          0 0 120px rgba(0, 255, 255, 0.2);
      }
    }

    @keyframes neonRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes separatorPulse {
      0%, 100% { 
        opacity: 1;
        transform: scale(1);
      }
      50% { 
        opacity: 0.7;
        transform: scale(1.1);
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .countdown-container {
        padding: 30px 40px;
      }

      .countdown-display {
        gap: 15px;

        .time-unit {
          width: 70px;
          height: 70px;
          min-width: 70px;
          min-height: 70px;

          .time-value {
            font-size: 36px;
          }
        }

        .time-separator {
          font-size: 36px;
        }
      }
    }

    @media (max-width: 480px) {
      .countdown-container {
        padding: 20px 30px;
      }

      .countdown-display {
        gap: 10px;

        .time-unit {
          width: 60px;
          height: 60px;
          min-width: 60px;
          min-height: 60px;

          .time-value {
            font-size: 28px;
          }
        }

        .time-separator {
          font-size: 28px;
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
