import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StandingsConstructorService } from './data-access/standings-constructor.service';
import { StandingsService } from './data-access/standings-drivers.service';

@Component({
  standalone: true,
  selector: 'app-standing-list',
  imports: [RouterLink],
  template: `<h1>Standings</h1>
    <h2>Season {{ standingsService.season() }}</h2>

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

    <h2>Constructors</h2>
    <h3>Season {{ standingsConstructorService.season() }}</h3>
    <ul>
      @for (standingsList of standingsConstructorService.StandingsLists(); track
      standingsConstructorService.StandingsLists){ @for(Constructor of
      standingsList.ConstructorStandings ; track Constructor) {
      <li>
        {{ Constructor.position }}
        {{ Constructor.Constructor.name }}
        {{ Constructor.points }}
      </li>
      } }
    </ul>

    <button routerLink="/home">Home</button> `,
})
export class StandingsListComponent {
  standingsService = inject(StandingsService);
  standingsConstructorService = inject(StandingsConstructorService);
}
