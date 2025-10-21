import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundAnimationService } from './services/background-animation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
export class App implements OnInit, OnDestroy {
  constructor(private backgroundAnimationService: BackgroundAnimationService) {}

  ngOnInit() {
    // Initialize background animation
    this.backgroundAnimationService.initializeBackgroundAnimation();
  }

  ngOnDestroy() {
    // Clean up background animation
    this.backgroundAnimationService.destroyBackgroundAnimation();
  }
}
