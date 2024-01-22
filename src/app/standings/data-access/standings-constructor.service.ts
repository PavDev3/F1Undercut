import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, map } from 'rxjs';
import { _standingsConstructorsBySeason } from '../../../../environments/environment';
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

  // state

  private state = signal<StandingsConstructorBySeason>({
    season: '',
    StandingsLists: [],
  });

  // selectors
  season = computed(() => this.state().season);
  StandingsLists = computed(() => this.state().StandingsLists);

  // sources
  standingsConstructorsBySeason$ = this.fetchStandingsConstructorBySeason();

  constructor() {
    // reducers

    this.standingsConstructorsBySeason$.subscribe((response) => {
      this.state.update((state) => ({
        ...state,
        season: response.MRData.StandingsTable.season,
        StandingsLists: response.MRData.StandingsTable.StandingsLists,
      }));
    });
  }

  private fetchStandingsConstructorBySeason() {
    return this.http
      .get<StandingsConstructorsResponse>(`${_standingsConstructorsBySeason}`)
      .pipe(
        catchError((err) => {
          console.error('Error');
          return EMPTY;
        }),
        map((response) => response)
      );
  }
}
