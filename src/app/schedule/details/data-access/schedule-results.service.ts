import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, finalize, map, switchMap, filter } from 'rxjs';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BASE_URL } from '../../../../../environments/environment';
import { SeasonStoreService } from '../../../shared/data-access/season-store.service';
import { Race, ResultsResponse } from '../interface/schedule-results.interface';

export interface ResultsSchedule {
  season: string;
  round: string;
  Races: Race[];
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleResultsService {
  private http = inject(HttpClient);
  private seasonStore = inject(SeasonStoreService);

  private state = signal<ResultsSchedule>({
    round: '',
    season: '',
    Races: [],
  });
  loading = signal(true);
  error = signal<string | null>(null);

  season = computed(() => this.state().season);
  Races = computed(() => this.state().Races);
  round = computed(() => this.state().round);

  constructor() {
    toObservable(this.seasonStore.selectedSeason)
      .pipe(
        filter((season) => Boolean(season)),
        switchMap(() => this.fetchScheduleResults()),
        takeUntilDestroyed()
      )
      .subscribe((response) => {
        this.state.update((state) => ({
          ...state,
          season: response.MRData.RaceTable.season,
          Races: response.MRData.RaceTable.Races,
          round: response.MRData.RaceTable.round,
        }));
      });
  }

  private fetchScheduleResults() {
    const season = this.seasonStore.selectedSeason();
    const url = `${BASE_URL}/${season}/results.json`;
    this.loading.set(true);
    this.error.set(null);
    return this.http.get<ResultsResponse>(url).pipe(
      finalize(() => this.loading.set(false)),
      catchError((err) => {
        console.error('Error fetching schedule results:', err);
        this.error.set('No se pudieron cargar los resultados.');
        return EMPTY;
      }),
      map((response) => response)
    );
  }

  getResultsByRound(round: string) {
    this.loading.set(true);
    this.error.set(null);
    return this.http
      .get<ResultsResponse>(
        `${BASE_URL}/${this.seasonStore.selectedSeason()}/${round}/results.json`
      )
      .pipe(
        finalize(() => this.loading.set(false)),
        catchError((err) => {
          console.error('Error fetching results by round:', err);
          this.error.set('No se pudieron cargar los resultados.');
          return EMPTY;
        })
      );
  }
}
