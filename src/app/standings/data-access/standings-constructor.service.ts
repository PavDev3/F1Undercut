import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, finalize, map, switchMap, filter } from 'rxjs';
import { BASE_URL } from '../../../../environments/environment';
import { SeasonStoreService } from '../../shared/data-access/season-store.service';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  StandingsConstructorsResponse,
  StandingsLists,
} from '../interfaces/standings-constructor.interface';

export interface StandingsConstructorBySeason {
  season: string;
  StandingsLists: StandingsLists[];
}

@Injectable({
  providedIn: 'root',
})
export class StandingsConstructorService {
  private http = inject(HttpClient);
  private seasonStore = inject(SeasonStoreService);

  // state

  private state = signal<StandingsConstructorBySeason>({
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
        switchMap(() => this.fetchStandingsConstructorBySeason()),
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

  private fetchStandingsConstructorBySeason() {
    this.loading.set(true);
    this.error.set(null);
    return this.http
      .get<StandingsConstructorsResponse>(
        `${BASE_URL}/${this.seasonStore.selectedSeason()}/constructorstandings.json`
      )
      .pipe(
        finalize(() => this.loading.set(false)),
        catchError((err) => {
          console.error('Error fetching constructor standings:', err);
          if (err instanceof HttpErrorResponse && err.status === 429) {
            this.error.set(
              'Demasiadas solicitudes a la API. Espera unos segundos e intenta de nuevo.'
            );
          } else {
            this.error.set('No se pudo cargar la clasificación de constructores.');
          }
          return EMPTY;
        }),
        map((response) => response)
      );
  }
}
