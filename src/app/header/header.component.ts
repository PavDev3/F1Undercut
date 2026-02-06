import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  template: `
    <header class="app-header">
      <div class="brand">
        <a class="logo" [routerLink]="['/']">F1 Undercut</a>
        <button
          class="menu-toggle"
          type="button"
          (click)="toggleMenu()"
          [attr.aria-expanded]="isMenuOpen"
          aria-label="Alternar menú de navegación"
          [class.open]="isMenuOpen"
        >
          <span></span>
          <span></span>
        </button>
      </div>
      <nav class="nav" [class.open]="isMenuOpen">
        <a
          mat-flat-button
          routerLink="/last-results"
          routerLinkActive="is-active"
          (click)="closeMenu()"
        >
          Últimos Resultados
        </a>
        <a
          mat-flat-button
          routerLink="/standings"
          routerLinkActive="is-active"
          (click)="closeMenu()"
        >
          Clasificación
        </a>
        <a
          mat-flat-button
          routerLink="/schedule"
          routerLinkActive="is-active"
          (click)="closeMenu()"
        >
          Calendario
        </a>
        <a
          mat-flat-button
          routerLink="/drivers"
          routerLinkActive="is-active"
          (click)="closeMenu()"
        >
          Pilotos
        </a>
        <a
          mat-flat-button
          routerLink="/teams"
          routerLinkActive="is-active"
          (click)="closeMenu()"
        >
          Escuderías
        </a>
        <a
          mat-flat-button
          routerLink="/tracks"
          routerLinkActive="is-active"
          (click)="closeMenu()"
        >
          Circuitos
        </a>
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
