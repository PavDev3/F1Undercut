import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, finalize, map, switchMap, filter } from 'rxjs';
import { BASE_URL } from '../../../../environments/environment';
import { SeasonStoreService } from '../../shared/data-access/season-store.service';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  StandingsDriversResponse,
  StandingsLists,
} from '../interfaces/standings-drivers.interface';

export interface StandingsBySeason {
  season: string;
  StandingsLists: StandingsLists[];
}

@Injectable({
  providedIn: 'root',
})
export class StandingsService {
  private http = inject(HttpClient);
  private seasonStore = inject(SeasonStoreService);

  // state

  private state = signal<StandingsBySeason>({
    season: '',
    StandingsLists: [],
  });
  loading = signal(true);
  error = signal<string | null>(null);

  // selectors
  season = computed(() => this.state().season);
  StandingsLists = computed(() => this.state().StandingsLists);

  constructor() {
    toObservable(this.seasonStore.selectedSeason)
      .pipe(
        filter((season) => Boolean(season)),
        switchMap(() => this.fetchStandingsDriversBySeason()),
        takeUntilDestroyed()
      )
      .subscribe((response) => {
        this.state.update((state) => ({
          ...state,
          season: response.MRData.StandingsTable.season,
          StandingsLists: response.MRData.StandingsTable.StandingsLists,
        }));
      });
  }

  private fetchStandingsDriversBySeason() {
    this.loading.set(true);
    this.error.set(null);
    return this.http
      .get<StandingsDriversResponse>(
        `${BASE_URL}/${this.seasonStore.selectedSeason()}/driverstandings.json`
      )
      .pipe(
        finalize(() => this.loading.set(false)),
        catchError((err) => {
          console.error('Error fetching driver standings:', err);
          this.error.set('No se pudo cargar la clasificación de pilotos.');
          return EMPTY;
        }),
        map((response) => response)
      );
  }
}
