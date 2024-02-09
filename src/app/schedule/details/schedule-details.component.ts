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
  templateUrl: './ui/schedule-details.component.html',

  styleUrls: ['./ui/schedule-details.component.scss'],
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
