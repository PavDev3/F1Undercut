import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from '../data-access/tracks.service';
import { Tracks } from '../interfaces/tracks.interface';

@Component({
  standalone: true,
  selector: 'track-details',
  template: ` <div>
    <h2>Circuit Details</h2>
    <div><strong>Circuit Name:</strong> {{ track.circuitName }}</div>
    <div><strong>Country:</strong> {{ track.Location.country }}</div>
    <div><strong>Locality:</strong> {{ track.Location.locality }}</div>
    <div><strong>Latitude:</strong> {{ track.Location.lat }}</div>
    <div><strong>Longitude:</strong> {{ track.Location.long }}</div>
    <div>
      <strong>Wikipedia:</strong>
      <a [href]="track.url" target="_blank"> {{ track.url }}</a>
    </div>
  </div>`,
  styles: [
    `
      div {
        margin: 20px;
      }
    `,
  ],
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
