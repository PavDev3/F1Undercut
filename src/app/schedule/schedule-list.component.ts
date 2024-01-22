import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScheduleService } from './data-access/schedule.service';

@Component({
  standalone: true,
  selector: 'app-schedule-list',
  imports: [RouterLink],
  template: `
    <div class="container text-center">
      <h1>Schedule</h1>
      <h2>Season {{ scheduleService.season() }}</h2>

      <table class="table">
        <thead>
          <tr>
            <th>Race</th>
            <th>Date</th>
            <th>Practice 1</th>
            <th>Qualifying</th>
            <th>Race Time</th>
          </tr>
        </thead>
        <tbody>
          @for (races of scheduleService.races(); track races.raceName) {
          <tr>
            <td>
              <b>{{ races.raceName }}</b>
            </td>
            <td>{{ races.date }}</td>
            <td>{{ races.FirstPractice.time }}</td>
            <td>{{ races.Qualifying.time }}</td>
            <td>{{ races.time }}</td>
          </tr>
          }
        </tbody>
      </table>

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
export class ScheduleListComponent {
  scheduleService = inject(ScheduleService);
}
