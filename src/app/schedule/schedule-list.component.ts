import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-schedule-list',
  imports: [RouterLink],
  template: `<h1>Schedule</h1>
    <button routerLink="/home">Home</button>`,
})
export class ScheduleListComponent {}
