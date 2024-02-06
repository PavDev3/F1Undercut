import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'schedule-details',
  template: `
    <div>
      <h2>Results</h2>
    </div>
  `,
  styles: [
    `
      div {
        margin: 20px;
      }
    `,
  ],
})
export class ScheduleDetailsComponent {
  constructor() {}
}
