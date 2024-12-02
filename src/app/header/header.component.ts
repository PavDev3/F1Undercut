import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink, MatButtonModule],

  template: `
    <header>
      <div>
        <a [routerLink]="['']">
          <h1>>>F1 Undercut<<</h1>
        </a>
        <button mat-flat-button routerLink="/last-results">
          Últimos Resultados
        </button>
        <button mat-flat-button routerLink="/standings">Clasificación</button>
        <button mat-flat-button routerLink="/schedule">Calendario</button>
        <button mat-flat-button routerLink="/drivers">Pilotos</button>
        <button mat-flat-button routerLink="/teams">Escuderías</button>
        <button mat-flat-button routerLink="/tracks">Circuitos</button>
      </div>
    </header>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        color: black;
      }
      header {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: grey;
        padding: 10px;
      }
      h1 {
        display: flex;
        justify-content: space-around;
      }
      button {
        margin: 8px;
      }
    `,
  ],
})
export class HeaderComponent {}
