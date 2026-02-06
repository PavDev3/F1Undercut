import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, finalize, map, switchMap, filter } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { BASE_URL } from '../../../../../environments/environment';
import { SeasonStoreService } from '../../../shared/data-access/season-store.service';
import { Driver, DriversResponse } from '../interfaces/drivers.interface';

export interface DriversBySeason {
  season: string;
  drivers: Driver[];
}
@Injectable({
  providedIn: 'root',
})
export class DriversService {
  private http = inject(HttpClient);
  private seasonStore = inject(SeasonStoreService);

  // state
  private state = signal<DriversBySeason>({
    season: '',
    drivers: [],
  });
  loading = signal(true);
  error = signal<string | null>(null);

  //Selectors
  season = computed(() => this.state().season);
  drivers = computed(() => this.state().drivers);
  driversSorted = computed(() => {
    const list = [...this.state().drivers];
    return list.sort((a, b) => {
      const aNum = Number(a.permanentNumber);
      const bNum = Number(b.permanentNumber);
      const aKey = Number.isFinite(aNum) ? aNum : Number.POSITIVE_INFINITY;
      const bKey = Number.isFinite(bNum) ? bNum : Number.POSITIVE_INFINITY;
      if (aKey !== bKey) {
        return aKey - bKey;
      }
      const aName = `${a.familyName ?? ''} ${a.givenName ?? ''}`.trim();
      const bName = `${b.familyName ?? ''} ${b.givenName ?? ''}`.trim();
      return aName.localeCompare(bName);
    });
  });

  constructor() {
    toObservable(this.seasonStore.selectedSeason)
      .pipe(
        filter((season) => Boolean(season)),
        switchMap(() => this.fetchDriversBySeason()),
        takeUntilDestroyed()
      )
      .subscribe((response) => {
        this.state.update((state) => ({
          ...state,
          season: response.MRData.DriverTable.season,
          drivers: response.MRData.DriverTable.Drivers,
        }));
      });
  }

  private fetchDriversBySeason() {
    this.loading.set(true);
    this.error.set(null);
    const season = this.seasonStore.selectedSeason();
    return this.http.get<DriversResponse>(`${BASE_URL}/${season}/drivers.json`).pipe(
      finalize(() => this.loading.set(false)),
      catchError((err) => {
        console.error('Error fetching drivers:', err);
        this.error.set('No se pudieron cargar los pilotos.');
        return EMPTY;
      }),
      map((response) => response)
    );
  }
  getDriverById(driverId: string): Driver | undefined {
    return this.state().drivers.find((driver) => driver.driverId === driverId);
  }

  fetchDriverById(season: string, driverId: string) {
    return this.http.get<DriversResponse>(
      `${BASE_URL}/${season}/drivers/${driverId}.json`
    );
  }
}
