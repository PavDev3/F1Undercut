import { Injectable, computed, signal, inject } from '@angular/core';
import { SeasonsService } from './seasons.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Season } from '../interfaces/seasons.interface';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeasonStoreService {
  private seasonsService = inject(SeasonsService);

  private seasonsState = signal<Season[]>([]);
  private selected = signal<string>('');

  seasons = computed(() => this.seasonsState());
  selectedSeason = computed(() => this.selected());

  constructor() {
    this.seasonsService
      .getSeasons()
      .pipe(
        map((response) => response.MRData.SeasonTable.Seasons ?? []),
        catchError(() => of([] as Season[])),
        takeUntilDestroyed()
      )
      .subscribe((seasons) => {
        const sorted = [...seasons]
          .filter((s) => Number.isFinite(Number(s.season)))
          .sort((a, b) => Number(b.season) - Number(a.season))
          .slice(0, 10);
        this.seasonsState.set(sorted);
        if (!this.selected() && sorted.length > 0) {
          const preferred = sorted.find((s) => s.season === '2026');
          this.selected.set(preferred?.season ?? sorted[0].season);
        }
      });
  }

  setSeason(season: string) {
    this.selected.set(season);
  }
}
