import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateFormatPipe, HoraFormatoPipe } from '../../shared/date-format.pipe';
import { ScheduleService } from './data-access/schedule.service';
import { MotionRevealDirective } from '../../shared/directives/motion-reveal.directive';
import { DecimalPipe } from '@angular/common';
import { Race } from './interfaces/schedule.interface';

@Component({
  standalone: true,
  selector: 'app-schedule-list',
  templateUrl: './ui/schedule-list.component.html',
  styleUrls: ['./ui/schedule-list.component.scss'],
  imports: [RouterLink, DateFormatPipe, HoraFormatoPipe, DecimalPipe, MotionRevealDirective],
})
export class ScheduleListComponent {
  scheduleService = inject(ScheduleService);

  private get today(): number {
    return new Date().setHours(0, 0, 0, 0);
  }

  private raceTimestamp(race: Race): number {
    return new Date(race.date).setHours(0, 0, 0, 0);
  }

  isPast(race: Race): boolean {
    return this.raceTimestamp(race) < this.today;
  }

  isLast(race: Race): boolean {
    const past = this.scheduleService.races().filter(r => this.raceTimestamp(r) < this.today);
    if (!past.length) return false;
    const maxRound = Math.max(...past.map(r => parseInt(r.round, 10)));
    return parseInt(race.round, 10) === maxRound;
  }

  isNext(race: Race): boolean {
    const future = this.scheduleService.races().filter(r => this.raceTimestamp(r) >= this.today);
    if (!future.length) return false;
    const minRound = Math.min(...future.map(r => parseInt(r.round, 10)));
    return parseInt(race.round, 10) === minRound;
  }

  isUpcoming(race: Race): boolean {
    return this.raceTimestamp(race) >= this.today && !this.isNext(race);
  }

  statusLabel(race: Race): string {
    if (this.isNext(race)) return 'PRÓXIMA';
    if (this.isLast(race)) return 'ÚLTIMA';
    if (this.isPast(race)) return 'COMPLETADA';
    return 'PENDIENTE';
  }

  countryFlag(country: string | undefined): string {
    const flags: Record<string, string> = {
      'Australia': '🇦🇺', 'China': '🇨🇳', 'Japan': '🇯🇵', 'Bahrain': '🇧🇭',
      'Saudi Arabia': '🇸🇦', 'United Arab Emirates': '🇦🇪', 'UAE': '🇦🇪',
      'Italy': '🇮🇹', 'Monaco': '🇲🇨', 'Canada': '🇨🇦', 'Spain': '🇪🇸',
      'Austria': '🇦🇹', 'United Kingdom': '🇬🇧', 'Great Britain': '🇬🇧', 'UK': '🇬🇧',
      'Hungary': '🇭🇺', 'Belgium': '🇧🇪', 'Netherlands': '🇳🇱', 'Azerbaijan': '🇦🇿',
      'Singapore': '🇸🇬', 'United States': '🇺🇸', 'USA': '🇺🇸', 'Mexico': '🇲🇽',
      'Brazil': '🇧🇷', 'Qatar': '🇶🇦', 'Abu Dhabi': '🇦🇪', 'Las Vegas': '🇺🇸',
      'Miami': '🇺🇸',
    };
    return flags[country ?? ''] ?? '🏁';
  }
}
