import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, map } from 'rxjs';
import { _currentResult } from '../../../../environments/environment';
import { FData } from '../interface/formulaApi';

export interface formulaState {
  FData: FData;
}

@Injectable({
  providedIn: 'root',
})
export class formulaService {
  private http = inject(HttpClient);

  // state
  private state = signal<formulaState>({
    FData: {
      url: '',
      limit: '',
      offset: '',
      total: '',
    },
  });

  //Selectors

  limit = computed(() => this.state().FData.limit);

  // Sources

  currentLoaded$ = this.fetchFormulaCurrent();

  constructor() {
    // Reducers

    this.currentLoaded$.pipe(takeUntilDestroyed()).subscribe((response) => {
      console.log(response);
      this.state.update((state) => ({
        ...state,
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
