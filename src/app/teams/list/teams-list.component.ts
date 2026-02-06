import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConstructorsService } from './data-access/teams.service';
import { FlagClassPipe } from '../../shared/pipes/flag-class.pipe';
import { MotionRevealDirective } from '../../shared/directives/motion-reveal.directive';
import { NationalityEsPipe } from '../../shared/pipes/nationality-es.pipe';

@Component({
  standalone: true,
  selector: 'app-teams-list',
  imports: [RouterLink, FlagClassPipe, MotionRevealDirective, NationalityEsPipe],
  templateUrl: './ui/teams-list.component.html',
  styleUrls: ['./ui/teams-list.component.scss'],
})
export class TeamsListComponent {
  constructorsService = inject(ConstructorsService);
}
