import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateFormatPipe, HoraFormatoPipe } from '../shared/date-format.pipe';
import { ScheduleService } from './data-access/schedule.service';

@Component({
  standalone: true,
  selector: 'app-schedule-list',
  template: `
    <div class="container">
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
              <a [routerLink]="['/results', races.round]">
                <b>{{ races.raceName }}</b></a
              >
            </td>
            <td>{{ races.date | dateFormat }}</td>
            <td>{{ races.FirstPractice.time | timeFormat }}</td>
            <td>{{ races.Qualifying.time | timeFormat }}</td>
            <td>{{ races.time | timeFormat }}</td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        color: black;
        transition: color 0.3s;
      }
      a:hover {
        color: blue; /* Cambia el color del texto cuando se pasa el cursor sobre el enlace */
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
  imports: [RouterLink, DateFormatPipe, HoraFormatoPipe],
})
export class ScheduleListComponent {
  scheduleService = inject(ScheduleService);
}
