import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateFormatPipe, HoraFormatoPipe } from '../../shared/date-format.pipe';
import { ScheduleService } from './data-access/schedule.service';

@Component({
  standalone: true,
  selector: 'app-schedule-list',
  templateUrl: './ui/schedule-list.component.html',
  styleUrls: ['./ui/schedule-list.component.scss'],

  imports: [RouterLink, DateFormatPipe, HoraFormatoPipe],
})
export class ScheduleListComponent {
  scheduleService = inject(ScheduleService);
}
