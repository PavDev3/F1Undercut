import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, map } from 'rxjs';
import { _tracksBySeason } from '../../../../environments/environment';
import { Tracks, TracksResponse } from '../interfaces/tracks.interface';

export interface TracksBySeason {
  season: string;
  tracks: Tracks[];
}

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private http = inject(HttpClient);

  // state

  private state = signal<TracksBySeason>({
    season: '',
    tracks: [],
  });

  // selectors

  season = computed(() => this.state().season);
  tracks = computed(() => this.state().tracks);

  // sources
  tracksBySeason$ = this.fetchTracksBySeason();

  constructor() {
    // reducers

    this.tracksBySeason$.subscribe((response) => {
      this.state.update((state) => ({
        ...state,
        season: response.MRData.CircuitTable.season,
        tracks: response.MRData.CircuitTable.Circuits,
      }));
    });
  }

  private fetchTracksBySeason() {
    return this.http.get<TracksResponse>(`${_tracksBySeason}`).pipe(
      catchError((err) => {
        console.error('Error');
        return EMPTY;
      }),
      map((response) => response)
    );
  }
}
