import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HeaderComponent } from './header/header.component';
import { SeasonSelectorComponent } from './shared/season-selector/season-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header></app-header>
    <app-season-selector></app-season-selector>
    <main [@routeAnimations]="getRouteAnimation(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `,
  styles: [],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(
          ':enter, :leave',
          [style({ position: 'absolute', width: '100%', left: 0, top: 0 })],
          { optional: true }
        ),
        query(':enter', [style({ opacity: 0, transform: 'translateY(10px)' })], {
          optional: true,
        }),
        group([
          query(
            ':leave',
            [animate('200ms ease', style({ opacity: 0, transform: 'translateY(-8px)' }))],
            { optional: true }
          ),
          query(
            ':enter',
            [animate('300ms 60ms ease', style({ opacity: 1, transform: 'translateY(0)' }))],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
  imports: [CommonModule, RouterOutlet, HeaderComponent, SeasonSelectorComponent],
})
export class AppComponent {
  getRouteAnimation(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] ?? 'root';
  }
}
