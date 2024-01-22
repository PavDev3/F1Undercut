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
          <table class="standings-table-drivers">
            <thead>
              <tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              @for (standingsList of standingsService.StandingsLists(); track
              standingsList.DriverStandings){ @for (Driver of
              standingsList.DriverStandings; track Driver) {
              <tr>
                <td>{{ Driver.position }}</td>
                <td>
                  {{ Driver.Driver.givenName }}
                  {{ Driver.Driver.familyName }}
                </td>
                <td>{{ Driver.points }}</td>
              </tr>
              } }
            </tbody>
          </table>
        </div>

        <div class="col">
          <h3>Constructors</h3>
          <table class="standings-table-constructors">
            <thead>
              <tr>
                <th>Position</th>
                <th>Constructor</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              @for (standingsList of
              standingsConstructorService.StandingsLists(); track
              standingsConstructorService.StandingsLists){ @for(Constructor of
              standingsList.ConstructorStandings ; track Constructor) {
              <tr>
                <td>{{ Constructor.position }}</td>
                <td>{{ Constructor.Constructor.name }}</td>
                <td>{{ Constructor.points }}</td>
              </tr>
              } }
            </tbody>
          </table>
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
        justify-content: space-around; /* Puedes ajustar esto según tus necesidades */
        width: 100%; /* O ajusta el ancho total según tus necesidades */
        margin-bottom: 20px;
      }

      .standings-table {
        width: 80%;
        margin-top: 20px;
        border-collapse: collapse;
      }

      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
      }
    `,
  ],
})
export class StandingsListComponent {
  standingsService = inject(StandingsService);
  standingsConstructorService = inject(StandingsConstructorService);
}
