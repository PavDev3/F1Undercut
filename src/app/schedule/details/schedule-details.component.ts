import { Component, inject } from '@angular/core';
import { ScheduleResultsService } from './data-access/schedule-results.service';

@Component({
  standalone: true,
  selector: 'schedule-details',
  template: `
    <div class="container">
      <h2>Results</h2>
      @for (races of scheduleResultsService.Races(); track races.raceName) {
      <h4>{{ races.Circuit.circuitName }}</h4>
      }

      <table>
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
          @for (race of scheduleResultsService.Races(); track
          scheduleResultsService.Races) { @for (result of race.Results; track
          result) {
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
})
export class ScheduleDetailsComponent {
  scheduleResultsService = inject(ScheduleResultsService);
  constructor() {}
}
