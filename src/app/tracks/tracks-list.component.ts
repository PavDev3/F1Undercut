import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TracksService } from './data-access/tracks.service';

@Component({
  standalone: true,
  selector: 'app-track-list',
  imports: [RouterLink],
  template: `<h1>Tracks</h1>
    <h2>Season {{ tracksService.season() }}</h2>
    <ul>
      @for (track of tracksService.tracks(); track track.circuitId) {
      <li>{{ track.circuitName }}, {{ track.Location.country }}</li>
      }
    </ul>
    <button routerLink="/home">Home</button>`,
})
export class TrackListComponent {
  tracksService = inject(TracksService);
}
