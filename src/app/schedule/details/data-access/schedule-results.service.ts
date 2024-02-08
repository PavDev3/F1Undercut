import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, map } from 'rxjs';
import { _scheduleDetailsResults } from '../../../../../environments/environment';

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

  // state

  private state = signal<ResultsSchedule>({
    round: '',
    season: '',
    Races: [],
  });

  // Selectors
  season = computed(() => this.state().season);
  Races = computed(() => this.state().Races);
  round = computed(() => this.state().round);

  // Sources

  scheduleResults$ = this.fetchScheduleResults();

  constructor() {
    // Reducers

    this.scheduleResults$.pipe(takeUntilDestroyed()).subscribe((response) => {
      this.state.update((state) => ({
        ...state,
        season: response.MRData.RaceTable.season,
        Races: response.MRData.RaceTable.Races,
        round: response.MRData.RaceTable.round,
      }));
    });
  }

  private fetchScheduleResults() {
    const url = `${_scheduleDetailsResults}results.json`;
    return this.http.get<ResultsResponse>(url).pipe(
      catchError((err) => {
        console.error('Error fetching schedule results');
        return EMPTY;
      }),
      map((response) => response)
    );
  }

  // Get results by round
  getResultsByRound(round: string) {
    return this.http.get<ResultsResponse>(
      `${_scheduleDetailsResults}${round}/results.json`
    );
  }
}
