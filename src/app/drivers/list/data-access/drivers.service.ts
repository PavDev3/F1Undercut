import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, map } from 'rxjs';
import { _driversBySeason } from '../../../../../environments/environment';
import { Driver, DriversResponse } from '../interfaces/drivers.interface';

export interface DriversBySeason {
  season: string;
  drivers: Driver[];
}

@Injectable({
  providedIn: 'root',
})
export class driversService {
  private http = inject(HttpClient);

  // state
  private state = signal<DriversBySeason>({
    season: '',
    drivers: [],
  });

  //Selectors
  driversBySeason = computed(() => this.state());

  // Sources
  driversBySeason$ = this.fetchDriversBySeason();

  constructor() {
    // reducers

    this.driversBySeason$.pipe(takeUntilDestroyed()).subscribe((response) => {
      this.state.update((state) => ({
        ...state,
        season: response.MRData.DriverTable.season,
        drivers: response.MRData.DriverTable.Drivers,
      }));
    });
  }

  private fetchDriversBySeason() {
    return this.http.get<DriversResponse>(`${_driversBySeason}`).pipe(
      catchError((err) => {
        console.error('Error');
        return EMPTY;
      }),
      map((response) => response)
    );
  }
}
