import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, map } from 'rxjs';
import { _currentResult } from '../../../../environments/environment';
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

  // state
  private state = signal<CurrentBySeason>({
    season: '',
    round: '',
    Races: [],
  });

  //Selectors
  season = computed(() => this.state().season);
  round = computed(() => this.state().round);
  Races = computed(() => this.state().Races);

  // Sources

  currentBySeason$ = this.fetchFormulaCurrent();

  constructor() {
    // Reducers

    this.currentBySeason$.pipe(takeUntilDestroyed()).subscribe((response) => {
      this.state.update((state) => ({
        ...state,
        season: response.MRData.RaceTable.season,
        round: response.MRData.RaceTable.round,
        Races: response.MRData.RaceTable.Races,
      }));
    });
  }

  private fetchFormulaCurrent() {
    return this.http.get<currentResponse>(`${_currentResult}`).pipe(
      catchError((err) => {
        console.error('Error fetching current results:', err);
        console.log('URL attempted:', _currentResult);
        return EMPTY;
      }),
      map((response) => {
        console.log('API Response:', response); // Para debugging
        return response;
      })
    );
  }
}
