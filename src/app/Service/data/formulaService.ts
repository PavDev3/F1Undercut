import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, map } from 'rxjs';
import { _currentResult } from '../../../../environments/environment';
import { MRData } from '../interface/formulaApi';

export interface formulaState {
  MRData: MRData;
}

@Injectable({
  providedIn: 'root',
})
export class formulaService {
  private http = inject(HttpClient);

  // state
  private state = signal<formulaState>({
    MRData: {
      url: '',
      limit: '',
      offset: '',
      total: '',
      RaceTable: {
        season: '',
        round: '',
        Races: [
          {
            season: '',
            round: '',
            url: '',
            raceName: '',
            Circuit: {
              circuitName: '',
            },
          },
        ],
      },
    },
  });

  //Selectors
  MRData = computed(() => this.state().MRData);

  // Sources

  currentLoaded$ = this.fetchFormulaCurrent();

  constructor() {
    // Reducers

    this.currentLoaded$.pipe(takeUntilDestroyed()).subscribe((response) => {
      console.log(response);
      this.state.update((state) => ({
        ...state,
        MRData: response.MRData,
      }));
    });
  }

  private fetchFormulaCurrent() {
    return this.http.get<formulaState>(`${_currentResult}`).pipe(
      catchError((err) => {
        console.error('Error fetching current results');
        return EMPTY;
      }),
      map((response) => response)
    );
  }
}
