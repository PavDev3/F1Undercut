import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CurrentService } from './data-access/last-results.service';

@Component({
  standalone: true,
  selector: 'app-last-results-list',
  template: `
    <div class="container">
      <h1>Last Results</h1>
      <h2>Season: {{ currentService.season() }}</h2>
      <h3>Round: {{ currentService.round() }}</h3>

      <table class="lastResults">
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Laps</th>
            <th>Time</th>
            <th>Status</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          @for (race of currentService.Races(); track currentService.Races) {
          @for (result of race.Results; track result) {
          <tr>
            <td>{{ result.position }}</td>
            <td>
              {{ result.Driver.givenName }}
              {{ result.Driver.familyName }}
            </td>
            <td>{{ result.Constructor.name }}</td>
            <td>{{ result.laps }}</td>
            <td>{{ result.Time?.time }}</td>
            <td>{{ result.status }}</td>
            <td>{{ result.points }}</td>
          </tr>

          } }
        </tbody>

        <tbody></tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .row {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-bottom: 20px;
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      table {
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
  imports: [RouterLink, HeaderComponent],
})
export class LastResultsComponent {
  currentService = inject(CurrentService);
}
