import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StandingsConstructorService } from './data-access/standings-constructor.service';
import { StandingsService } from './data-access/standings-drivers.service';

@Component({
  standalone: true,
  selector: 'app-standing-list',
  imports: [RouterLink],
  template: `
    <div class="container text-center">
      <div>
        <h1>Standings</h1>
        <h2>Season {{ standingsService.season() }}</h2>
      </div>
      <div class="row">
        <div class="col">
          <h3>Drivers</h3>
          <ul>
            @for (standingsList of standingsService.StandingsLists(); track
            standingsList.DriverStandings){ @for (Driver of
            standingsList.DriverStandings; track Driver) {
            <li>
              {{ Driver.position }}
              {{ Driver.Driver.givenName }}
              {{ Driver.Driver.familyName }}:
              {{ Driver.points }}
            </li>
            } }
          </ul>
        </div>

        <div class="col">
          <h3>Constructors</h3>
          <ul>
            @for (standingsList of standingsConstructorService.StandingsLists();
            track standingsConstructorService.StandingsLists){ @for(Constructor
            of standingsList.ConstructorStandings ; track Constructor) {
            <li>
              {{ Constructor.position }}
              {{ Constructor.Constructor.name }}:
              {{ Constructor.points }}
            </li>
            } }
          </ul>
        </div>
      </div>

      <button routerLink="/home">Home</button>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .row {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-bottom: 20px;
      }

      .col {
        width: 50%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      button {
        margin-top: 20px;
      }
    `,
  ],
})
export class StandingsListComponent {
  standingsService = inject(StandingsService);
  standingsConstructorService = inject(StandingsConstructorService);
}
