import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { ScheduleResultsService } from './data-access';
import { MotionRevealDirective } from '../../shared/directives/motion-reveal.directive';
import { StatusEsPipe } from '../../shared/pipes/status-es.pipe';
import { Race } from './interface/schedule-results.interface';

@Component({
  standalone: true,
  selector: 'schedule-details',
  imports: [NgIf, MotionRevealDirective, StatusEsPipe],
  templateUrl: './ui/schedule-details.component.html',
  styleUrls: ['./ui/schedule-details.component.scss'],
})
export class ScheduleDetailsComponent implements OnInit {
  @Input() id!: string;
  details: Race | null = null;

  scheduleResultsService = inject(ScheduleResultsService);
  private destroyRef = inject(DestroyRef);
  private location = inject(Location);

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

  goBack() {
    this.location.back();
  }
}
