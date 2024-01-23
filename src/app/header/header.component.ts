import { Component } from '@angular/core';
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
  ],

  template: `
    <header>
      <div>
        <h1>F1 Undercut</h1>
        <button routerLink="/last-results">Last Results</button>
        <button routerLink="/standings">Standings</button>
        <button routerLink="/drivers">Drivers</button>
        <button routerLink="/schedule">Schedule</button>
        <button routerLink="/teams">Teams</button>
        <button routerLink="/tracks">Tracks</button>
      </div>
    </header>
  `,
  styles: [
    `
      header {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #333;
        color: #fff;
        padding: 10px;
      }
      h1 {
        display: flex;
        justify-content: space-around;
      }
    `,
  ],
})
export class HeaderComponent {}
