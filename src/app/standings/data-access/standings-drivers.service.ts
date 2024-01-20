import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, map } from 'rxjs';
import { _standingsDriversBySeason } from '../../../../environments/environment';
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

  // state

  private state = signal<StandingsBySeason>({
    season: '',
    StandingsLists: [],
  });

  // selectors
  season = computed(() => this.state().season);
  StandingsLists = computed(() => this.state().StandingsLists);

  // sources
  standingsDriversBySeason$ = this.fetchStandingsDriversBySeason();

  constructor() {
    // reducers

    this.standingsDriversBySeason$.subscribe((response) => {
      console.log(response);
      this.state.update((state) => ({
        ...state,
        season: response.MRData.StandingsTable.season,
        StandingsLists: response.MRData.StandingsTable.StandingsLists,
      }));
    });
  }

  private fetchStandingsDriversBySeason() {
    return this.http
      .get<StandingsDriversResponse>(`${_standingsDriversBySeason}`)
      .pipe(
        catchError((err) => {
          console.error('Error');
          return EMPTY;
        }),
        map((response) => response)
      );
  }
}
