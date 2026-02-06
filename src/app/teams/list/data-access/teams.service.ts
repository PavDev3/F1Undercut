import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, finalize, map, switchMap, filter } from 'rxjs';
import { BASE_URL } from '../../../../../environments/environment';
import { SeasonStoreService } from '../../../shared/data-access/season-store.service';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Constructors,
  ConstructorsResponse,
} from '../interfaces/teams.interface';

export interface ConstructorsBySeason {
  season: string;
  constructors: Constructors[];
}

@Injectable({
  providedIn: 'root',
})
export class ConstructorsService {
  private http = inject(HttpClient);
  private seasonStore = inject(SeasonStoreService);

  // state

  private state = signal<ConstructorsBySeason>({
    season: '',
    constructors: [],
  });
  loading = signal(true);
  error = signal<string | null>(null);

  // selectors

  season = computed(() => this.state().season);
  constructors = computed(() => this.state().constructors);

  constructor() {
    toObservable(this.seasonStore.selectedSeason)
      .pipe(
        filter((season) => Boolean(season)),
        switchMap(() => this.fetchConstructorSeason()),
        takeUntilDestroyed()
      )
      .subscribe((response) => {
        this.state.update((state) => ({
          ...state,
          season: response.MRData.ConstructorTable.season,
          constructors: response.MRData.ConstructorTable.Constructors,
        }));
      });
  }

  private fetchConstructorSeason() {
    this.loading.set(true);
    this.error.set(null);
    const season = this.seasonStore.selectedSeason();
    return this.http
      .get<ConstructorsResponse>(`${BASE_URL}/${season}/constructors.json`)
      .pipe(
      finalize(() => this.loading.set(false)),
      catchError((err) => {
        console.error('Error fetching constructors:', err);
        this.error.set('No se pudieron cargar las escuderías.');
        return EMPTY;
      }),
      map((response) => response)
    );
  }

  getConstructorById(constructorId: string): Constructors | undefined {
    return this.state().constructors.find(
      (constructor) => constructor.constructorId === constructorId
    );
  }

  fetchConstructorById(season: string, constructorId: string) {
    return this.http.get<ConstructorsResponse>(
      `${BASE_URL}/${season}/constructors/${constructorId}.json`
    );
  }
}
