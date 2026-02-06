import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StandingsConstructorService } from './data-access/standings-constructor.service';
import { StandingsService } from './data-access/standings-drivers.service';
import { MotionRevealDirective } from '../shared/directives/motion-reveal.directive';
import { CountUpDirective } from '../shared/directives/count-up.directive';

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
}
