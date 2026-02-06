import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConstructorsService } from './data-access/teams.service';
import { FlagClassPipe } from '../../shared/pipes/flag-class.pipe';
import { MotionRevealDirective } from '../../shared/directives/motion-reveal.directive';

@Component({
  standalone: true,
  selector: 'app-teams-list',
  imports: [RouterLink, FlagClassPipe, MotionRevealDirective],
  templateUrl: './ui/teams-list.component.html',
  styleUrls: ['./ui/teams-list.component.scss'],
})
export class TeamsListComponent {
  constructorsService = inject(ConstructorsService);
}
