import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrentService } from './data-access/last-results.service';

@Component({
  standalone: true,
  selector: 'app-last-results-list',
  imports: [RouterLink],
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
          @for (result of currentService.Races(); track currentService.Races) {
          @for (results of result.Results; track results) {
          <tr>
            <td>{{ results.position }}</td>
            <td>
              {{ results.Driver.givenName }}
              {{ results.Driver.familyName }}
            </td>
            <td>{{ results.Constructor.name }}</td>
            <td>{{ results.laps }}</td>
            <td>{{ results.Time?.time }}</td>
            <td>{{ results.status }}</td>
            <td>{{ results.points }}</td>
          </tr>

          } }
        </tbody>

        <tbody></tbody>
      </table>

      <button routerLink="/home">Home</button>
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

      button {
        margin-top: 20px;
      }
    `,
  ],
})
export class LastResultsComponent {
  currentService = inject(CurrentService);
}
