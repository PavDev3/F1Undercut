import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { ScheduleResultsService } from './data-access';
import { MotionRevealDirective } from '../../shared/directives/motion-reveal.directive';
import { Race } from './interface/schedule-results.interface';

@Component({
  standalone: true,
  selector: 'schedule-details',
  imports: [NgIf, MotionRevealDirective],
  templateUrl: './ui/schedule-details.component.html',
  styleUrls: ['./ui/schedule-details.component.scss'],
})
export class ScheduleDetailsComponent implements OnInit {
  @Input() id!: string;
  details: Race | null = null;

  scheduleResultsService = inject(ScheduleResultsService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    if (!this.id) {
      return;
    }
    this.scheduleResultsService
      .getResultsByRound(this.id)
      .pipe(
        map((response) => response.MRData.RaceTable.Races[0] ?? null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((race) => (this.details = race));
  }
}
