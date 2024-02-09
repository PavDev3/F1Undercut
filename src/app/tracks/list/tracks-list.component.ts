import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TracksService } from './data-access/tracks.service';

@Component({
  standalone: true,
  selector: 'app-track-list',
  imports: [RouterLink],
  templateUrl: './ui/tracks-list.component.html',
  styleUrls: ['./ui/tracks-list.component.scss'],
})
export class TrackListComponent {
  tracksService = inject(TracksService);
}
