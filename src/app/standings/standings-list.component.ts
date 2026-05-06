import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StandingsConstructorService } from './data-access/standings-constructor.service';
import { StandingsService } from './data-access/standings-drivers.service';
import { MotionRevealDirective } from '../shared/directives/motion-reveal.directive';
import { CountUpDirective } from '../shared/directives/count-up.directive';
import { CONSTRUCTOR_COLORS } from '../lastResults/last-results.component';

@Component({
  standalone: true,
  selector: 'app-standing-list',
  imports: [RouterLink, MotionRevealDirective, CountUpDirective],
  templateUrl: './ui/standings-list.component.html',
  styleUrls: ['./ui/standings-list.component.scss'],
})
export class StandingsListComponent {
  standingsService = inject(StandingsService);
  standingsConstructorService = inject(StandingsConstructorService);

  activeTab: 'drivers' | 'teams' = 'drivers';

  maxDriverPts = computed(() => {
    const lists = this.standingsService.StandingsLists();
    if (!lists.length) return 1;
    return parseFloat(lists[0].DriverStandings[0]?.points ?? '1') || 1;
  });

  maxTeamPts = computed(() => {
    const lists = this.standingsConstructorService.StandingsLists();
    if (!lists.length) return 1;
    return parseFloat(lists[0].ConstructorStandings[0]?.points ?? '1') || 1;
  });

  constructorColor(constructorId: string | undefined): string {
    return CONSTRUCTOR_COLORS[constructorId ?? ''] ?? 'var(--border-2)';
  }

  progressPct(points: string, max: number): number {
    return Math.round((parseFloat(points) / max) * 100);
  }
}
