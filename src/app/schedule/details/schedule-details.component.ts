import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from '../../tracks/data-access/tracks.service';
import { Tracks } from '../../tracks/interfaces/tracks.interface';

@Component({
  standalone: true,
  selector: 'schedule-details',
  template: ` <div>
    <h2>Results</h2>
    <div><strong>Circuit Name:</strong> {{ track.circuitName }}</div>

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
export class ScheduleDetailsComponent {
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
