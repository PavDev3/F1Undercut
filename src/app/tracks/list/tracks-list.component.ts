import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TracksService } from './data-access/tracks.service';
import { FlagClassPipe } from '../../shared/pipes/flag-class.pipe';
import { MotionRevealDirective } from '../../shared/directives/motion-reveal.directive';
import { NationalityEsPipe } from '../../shared/pipes/nationality-es.pipe';

@Component({
  standalone: true,
  selector: 'app-track-list',
  imports: [RouterLink, FlagClassPipe, MotionRevealDirective, NationalityEsPipe],
  templateUrl: './ui/tracks-list.component.html',
  styleUrls: ['./ui/tracks-list.component.scss'],
})
export class TrackListComponent {
  tracksService = inject(TracksService);
}
