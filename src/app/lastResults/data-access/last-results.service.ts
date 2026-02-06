import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, finalize, map, switchMap, filter } from 'rxjs';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BASE_URL } from '../../../../environments/environment';
import { SeasonStoreService } from '../../shared/data-access/season-store.service';
import { Races, currentResponse } from '../interfaces/last-results.interface';

export interface CurrentBySeason {
  season: string;
  round: string;
  Races: Races[];
}

@Injectable({
  providedIn: 'root',
})
export class CurrentService {
  private http = inject(HttpClient);
  private seasonStore = inject(SeasonStoreService);

  private state = signal<CurrentBySeason>({
    season: '',
    round: '',
    Races: [],
  });
  loading = signal(true);
  error = signal<string | null>(null);

  season = computed(() => this.state().season);
  round = computed(() => this.state().round);
  Races = computed(() => this.state().Races);

  constructor() {
    toObservable(this.seasonStore.selectedSeason)
      .pipe(
        filter((season) => Boolean(season)),
        switchMap(() => this.fetchFormulaCurrent()),
        takeUntilDestroyed()
      )
      .subscribe((response) => {
        this.state.update((state) => ({
          ...state,
          season: response.MRData.RaceTable.season,
          round: response.MRData.RaceTable.round,
          Races: response.MRData.RaceTable.Races,
        }));
      });
  }

  private fetchFormulaCurrent() {
    this.loading.set(true);
    this.error.set(null);
    const season = this.seasonStore.selectedSeason();
    return this.http
      .get<currentResponse>(`${BASE_URL}/${season}/last/results.json`)
      .pipe(
        finalize(() => this.loading.set(false)),
        catchError((err) => {
          console.error('Error fetching current results:', err);
          this.error.set('No se pudieron cargar los últimos resultados.');
          return EMPTY;
        }),
        map((response) => response)
      );
  }
}
