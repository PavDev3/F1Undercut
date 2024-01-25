import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError, map } from 'rxjs';
import { _constructorsBySeason } from '../../../../environments/environment';
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

  // state

  private state = signal<ConstructorsBySeason>({
    season: '',
    constructors: [],
  });

  // selectors

  season = computed(() => this.state().season);
  constructors = computed(() => this.state().constructors);

  // sources

  constructorBySeason$ = this.fetchConstructorSeason();

  constructor() {
    // reducers

    this.constructorBySeason$.subscribe((response) => {
      this.state.update((state) => ({
        ...state,
        season: response.MRData.ConstructorTable.season,
        constructors: response.MRData.ConstructorTable.Constructors,
      }));
    });
  }

  private fetchConstructorSeason() {
    return this.http.get<ConstructorsResponse>(`${_constructorsBySeason}`).pipe(
      catchError((err) => {
        console.error('Error');
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
}
