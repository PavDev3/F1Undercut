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
      standingsList.DriverStandings){
      <li>
        {{ standingsList.DriverStandings[0].position }}
        {{ standingsList.DriverStandings[0].Driver.givenName }}
        {{ standingsList.DriverStandings[0].Driver.familyName }}
        {{ standingsList.DriverStandings[0].points }}
      </li>
      }
    </ul>

    <button routerLink="/home">Home</button> `,
})
export class StandingsListComponent {
  standingsService = inject(StandingsService);
}
