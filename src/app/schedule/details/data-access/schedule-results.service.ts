import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, map } from 'rxjs';
import { _scheduleDetailsResults } from '../../../../../environments/environment';
import {
  Races,
  ResultsResponse,
} from '../interface/schedule-results.interface';

export interface ResultsSchedule {
  season: string;
  Races: Races[];
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleResultsService {
  private http = inject(HttpClient);

  // state

  private state = signal<ResultsSchedule>({
    season: '',
    Races: [],
  });

  // Selectors
  season = computed(() => this.state().season);
  Races = computed(() => this.state().Races);

  // Sources

  scheduleResults$ = this.fetchScheduleResults();

  constructor() {
    // Reducers

    this.scheduleResults$.pipe(takeUntilDestroyed()).subscribe((response) => {
      this.state.update((state) => ({
        ...state,
        season: response.MRData.RaceTable.season,
        Races: response.MRData.RaceTable.Races,
      }));
    });
  }

  private fetchScheduleResults() {
    return this.http.get<ResultsResponse>(`${_scheduleDetailsResults}`).pipe(
      catchError((err) => {
        console.error('Error fetching schedule results');
        return EMPTY;
      }),
      map((response) => response)
    );
  }

  getRaceById(circuitName: string): Races | undefined {
    return this.state().Races.find(
      (circuit) => circuit.Circuit.circuitName === circuitName
    );
  }
}
