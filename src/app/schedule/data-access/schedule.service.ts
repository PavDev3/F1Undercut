import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, map } from 'rxjs';
import { _scheduleBySeason } from '../../../../environments/environment';
import { Races, ScheduleResponse } from '../interfaces/schedule.interface';

export interface ScheduleBySeason {
  season: string;
  races: Races[];
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private http = inject(HttpClient);

  // state

  private state = signal<ScheduleBySeason>({
    season: '',
    races: [],
  });

  // selectors
  season = computed(() => this.state().season);
  races = computed(() => this.state().races);

  // sources
  scheduleBySeason$ = this.fetchScheduleBySeason();

  constructor() {
    // reducers

    this.scheduleBySeason$.subscribe((response) => {
      this.state.update((state) => ({
        ...state,
        season: response.MRData.RaceTable.season,
        races: response.MRData.RaceTable.Races,
      }));
    });
  }

  private fetchScheduleBySeason() {
    return this.http.get<ScheduleResponse>(`${_scheduleBySeason}`).pipe(
      catchError((err) => {
        console.error('Error');
        return EMPTY;
      }),
      map((response) => response)
    );
  }
}
