import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, finalize, map, switchMap, filter } from 'rxjs';
import { BASE_URL } from '../../../../../environments/environment';
import { SeasonStoreService } from '../../../shared/data-access/season-store.service';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Race, ScheduleResponse } from '../interfaces/schedule.interface';

export interface ScheduleBySeason {
  season: string;
  races: Race[];
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private http = inject(HttpClient);
  private seasonStore = inject(SeasonStoreService);

  // state

  private state = signal<ScheduleBySeason>({
    season: '',
    races: [],
  });
  loading = signal(true);
  error = signal<string | null>(null);

  // selectors
  season = computed(() => this.state().season);
  races = computed(() => this.state().races);

  constructor() {
    toObservable(this.seasonStore.selectedSeason)
      .pipe(
        filter((season) => Boolean(season)),
        switchMap(() => this.fetchScheduleBySeason()),
        takeUntilDestroyed()
      )
      .subscribe((response) => {
        this.state.update((state) => ({
          ...state,
          season: response.MRData.RaceTable.season,
          races: response.MRData.RaceTable.Races,
        }));
      });
  }

  private fetchScheduleBySeason() {
    this.loading.set(true);
    this.error.set(null);
    const season = this.seasonStore.selectedSeason();
    return this.http.get<ScheduleResponse>(`${BASE_URL}/${season}/races.json`).pipe(
      finalize(() => this.loading.set(false)),
      catchError((err) => {
        console.error('Error fetching schedule:', err);
        this.error.set('No se pudo cargar el calendario.');
        return EMPTY;
      }),
      map((response) => response)
    );
  }
}
