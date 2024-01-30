import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DriversListComponent } from '../drivers/list/drivers-list.component';
import { ScheduleListComponent } from '../schedule/schedule-list.component';
import { StandingsListComponent } from '../standings/standings-list.component';
import { TeamsListComponent } from '../teams/teams-list.component';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    RouterOutlet,
    RouterLink,
    DriversListComponent,
    StandingsListComponent,
    ScheduleListComponent,
    TeamsListComponent,
    HeaderComponent,
    MatButtonModule,
  ],

  template: `
    <header>
      <div>
        <h1>F1 Undercut</h1>
        <button mat-flat-button routerLink="/last-results">Last Results</button>
        <button mat-flat-button routerLink="/standings">Standings</button>
        <button mat-flat-button routerLink="/schedule">Schedule</button>
        <button mat-flat-button routerLink="/drivers">Drivers</button>
        <button mat-flat-button routerLink="/teams">Teams</button>
        <button mat-flat-button routerLink="/tracks">Tracks</button>
      </div>
    </header>
  `,
  styles: [
    `
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
