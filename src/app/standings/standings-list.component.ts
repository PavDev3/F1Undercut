import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StandingsService } from './data-access/standings-drivers.service';

@Component({
  standalone: true,
  selector: 'app-standing-list',
  imports: [RouterLink],
  template: `<h1>Standings</h1>
    <h2>{{ standingsService.season() }}</h2>

    <h2>Drivers</h2>
    <ul>
      @for (standingsList of standingsService.StandingsLists(); track
      standingsList.DriverStandings){ @for (Driver of
      standingsList.DriverStandings; track Driver) {
      <li>
        {{ Driver.position }}
        {{ Driver.Driver.givenName }}
        {{ Driver.Driver.familyName }}
        {{ Driver.points }}
      </li>
      } }
    </ul>

    <button routerLink="/home">Home</button> `,
})
export class StandingsListComponent {
  standingsService = inject(StandingsService);
}
