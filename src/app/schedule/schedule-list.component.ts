import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScheduleService } from './data-access/schedule.service';

@Component({
  standalone: true,
  selector: 'app-schedule-list',
  imports: [RouterLink],
  template: `<h1>Schedule</h1>

    <h2>Season {{ scheduleService.season() }}</h2>
    <ul>
      @for (races of scheduleService.races(); track races.raceName) {
      <li>
        <b>{{ races.raceName }}</b> {{ races.date }}
      </li>
      <p>
        <b>P1</b>: {{ races.FirstPractice.time }} <b>Q:</b
        >{{ races.Qualifying.time }} <b>R:</b>{{ races.time }}
      </p>
      }
    </ul>

    <button routerLink="/home">Home</button>`,
})
export class ScheduleListComponent {
  scheduleService = inject(ScheduleService);
}
