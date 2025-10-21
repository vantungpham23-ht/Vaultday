import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
export class App implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    // Background animation removed for minimalist design
  }

  ngOnDestroy() {
    // Clean up removed
  }
}
