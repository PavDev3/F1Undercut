import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, finalize, map, switchMap, filter } from 'rxjs';
import { BASE_URL } from '../../../../../environments/environment';
import { SeasonStoreService } from '../../../shared/data-access/season-store.service';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private seasonStore = inject(SeasonStoreService);

  // state

  private state = signal<TracksBySeason>({
    season: '',
    tracks: [],
  });
  loading = signal(true);
  error = signal<string | null>(null);

  // selectors

  season = computed(() => this.state().season);
  tracks = computed(() => this.state().tracks);

  constructor() {
    toObservable(this.seasonStore.selectedSeason)
      .pipe(
        filter((season) => Boolean(season)),
        switchMap(() => this.fetchTracksBySeason()),
        takeUntilDestroyed()
      )
      .subscribe((response) => {
        this.state.update((state) => ({
          ...state,
          season: response.MRData.CircuitTable.season,
          tracks: response.MRData.CircuitTable.Circuits,
        }));
      });
  }

  private fetchTracksBySeason() {
    this.loading.set(true);
    this.error.set(null);
    const season = this.seasonStore.selectedSeason();
    return this.http.get<TracksResponse>(`${BASE_URL}/${season}/circuits.json`).pipe(
      finalize(() => this.loading.set(false)),
      catchError((err) => {
        console.error('Error fetching tracks:', err);
        this.error.set('No se pudieron cargar los circuitos.');
        return EMPTY;
      }),
      map((response) => response)
    );
  }

  getTrackById(circuitId: string): Tracks | undefined {
    return this.state().tracks.find((track) => track.circuitId === circuitId);
  }

  fetchTrackById(season: string, circuitId: string) {
    return this.http.get<TracksResponse>(
      `${BASE_URL}/${season}/circuits/${circuitId}.json`
    );
  }
}
