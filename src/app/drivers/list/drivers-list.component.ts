import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DriversService } from './data-access/drivers.service';
import { FlagClassPipe } from '../../shared/pipes/flag-class.pipe';
import { MotionRevealDirective } from '../../shared/directives/motion-reveal.directive';
import { NationalityEsPipe } from '../../shared/pipes/nationality-es.pipe';
import { StandingsService } from '../../standings/data-access/standings-drivers.service';
import { CONSTRUCTOR_COLORS } from '../../lastResults/last-results.component';

const TEAM_SHORT: Record<string, string> = {
  red_bull: 'RBR', ferrari: 'FER', mercedes: 'MER', mclaren: 'MCL',
  aston_martin: 'AMR', alpine: 'ALP', williams: 'WIL', rb: 'VCARB',
  sauber: 'SAU', haas: 'HAA',
};

@Component({
  standalone: true,
  selector: 'app-drivers-list',
  imports: [RouterLink, FlagClassPipe, MotionRevealDirective, NationalityEsPipe],
  templateUrl: './ui/drivers-list.component.html',
  styleUrls: ['./ui/drivers-list.component.scss'],
})
export class DriversListComponent {
  driversService = inject(DriversService);
  private standingsService = inject(StandingsService);

  private driverTeamMap = computed<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    const lists = this.standingsService.StandingsLists();
    if (!lists.length) return map;
    lists[0].DriverStandings.forEach(s => {
      map[s.Driver.driverId] = s.Constructors[0]?.constructorId ?? '';
    });
    return map;
  });

  constructorColorByDriver(driverId: string): string {
    const id = this.driverTeamMap()[driverId];
    return CONSTRUCTOR_COLORS[id] ?? 'var(--border-2)';
  }

  teamShortByDriver(driverId: string): string {
    const id = this.driverTeamMap()[driverId];
    return TEAM_SHORT[id] ?? id?.toUpperCase() ?? '—';
  }
}
