import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TelegramService } from './services/telegram.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  template: `<router-outlet />`,
})
export class AppComponent {
  telegram = inject(TelegramService);
  constructor() {
    this.telegram.ready();
  }
}
