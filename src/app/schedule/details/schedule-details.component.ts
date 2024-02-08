import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { JsonPipe, NgIf } from '@angular/common';
import { ScheduleResultsService } from './data-access/schedule-results.service';
import { Race } from './interface/schedule-results.interface';

@Component({
  standalone: true,
  selector: 'schedule-details',
  imports: [JsonPipe, NgIf],
  template: `
    <div class="container" *ngIf="details">
      <h2>Results</h2>
      <h3>{{ details.raceName }}</h3>
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
          @for (result of details.Results; track result) {
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

          }
        </tbody>
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
  @Input() id!: string;
  details!: Race;

  scheduleResultsService = inject(ScheduleResultsService);
  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit() {
    // this.round = this.route.snapshot.paramMap.get('id')!;
    this.scheduleResultsService
      .getResultsByRound(this.id)
      .pipe(
        map((response) => (this.details = response.MRData.RaceTable.Races[0]))
      )
      .subscribe();
  }
}
