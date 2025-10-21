import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { SoundService } from '../services/sound.service';

@Directive({
  selector: '[appSoundClick]',
  standalone: true
})
export class SoundClickDirective implements OnInit {
  @Input() soundType: 'button' | 'success' | 'error' | 'notification' | 'message' | 'toggle' = 'button';

  constructor(
    private el: ElementRef,
    private soundService: SoundService
  ) {}

  ngOnInit() {
    // Resume audio context on first interaction
    this.soundService.resumeAudioContext();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    // Play appropriate sound based on type
    switch (this.soundType) {
      case 'button':
        this.soundService.playButtonClick();
        break;
      case 'success':
        this.soundService.playSuccess();
        break;
      case 'error':
        this.soundService.playError();
        break;
      case 'notification':
        this.soundService.playNotification();
        break;
      case 'message':
        this.soundService.playMessageSend();
        break;
      case 'toggle':
        this.soundService.playToggle();
        break;
    }
  }
}
