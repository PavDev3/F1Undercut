import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from '../list/data-access/tracks.service';
import { Tracks } from '../list/interfaces/tracks.interface';

@Component({
  standalone: true,
  selector: 'track-details',
  templateUrl: './ui/track-details.component.html',
  styleUrls: ['./ui/track-details.component.scss'],
})
export class TrackDetailsComponent {
  circuitId!: string;
  track!: Tracks;

  constructor(
    private route: ActivatedRoute,
    private tracksService: TracksService
  ) {}

  ngOnInit() {
    this.circuitId = this.route.snapshot.paramMap.get('id')!;
    if (this.circuitId) {
      this.loadTrackDetails();
    }
  }
  loadTrackDetails() {
    this.track =
      this.tracksService.getTrackById(this.circuitId) ?? ({} as Tracks);

    if (!this.track) {
      console.log('No track found');
    }
  }
}
