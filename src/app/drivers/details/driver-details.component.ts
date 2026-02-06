import { Component, DestroyRef, Injector, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DateFormatPipe } from '../../shared/date-format.pipe';
import { Location } from '@angular/common';
import { DriversService } from '../list/data-access/drivers.service';
import { Driver, DriversResponse } from '../list/interfaces/drivers.interface';
import { WikiSummaryService } from '../../shared/data-access/wiki-summary.service';
import { WikiSummary } from '../../shared/interfaces/wiki-summary.interface';
import { FlagClassPipe } from '../../shared/pipes/flag-class.pipe';
import { NationalityEsPipe } from '../../shared/pipes/nationality-es.pipe';
import { OpenF1Service } from '../../shared/data-access/openf1.service';
import { OpenF1Driver } from '../../shared/interfaces/openf1.interface';
import { SeasonStoreService } from '../../shared/data-access/season-store.service';

@Component({
  standalone: true,
  selector: 'driver-details',
  templateUrl: './ui/driver-details.component.html',
  styleUrls: ['./ui/driver-details.component.scss'],
  imports: [DateFormatPipe, FlagClassPipe, NationalityEsPipe],
})
export class DriverDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seasonStore = inject(SeasonStoreService);
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);
  driversService = inject(DriversService);
  private wikiService = inject(WikiSummaryService);
  private openF1Service = inject(OpenF1Service);
  private location = inject(Location);

  driverId = signal<string>('');
  driver = signal<Driver | null>(null);
  wiki = signal<WikiSummary | null>(null);
  wikiLoading = signal(false);
  wikiError = signal<string | null>(null);
  openF1 = signal<OpenF1Driver | null>(null);
  openF1Loading = signal(false);
  openF1Error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.driverId.set(id);

    toObservable(this.seasonStore.selectedSeason, { injector: this.injector })
      .pipe(
        filter((season) => Boolean(season)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((season) => {
        const cached = this.driversService.getDriverById(id);
        if (cached) {
          this.driver.set(cached);
          return;
        }
        this.driversService
          .fetchDriverById(season, id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((response: DriversResponse) => {
            const found = response.MRData.DriverTable.Drivers?.[0] ?? null;
            this.driver.set(found);
          });
      });

    toObservable(this.driver, { injector: this.injector })
      .pipe(
        map((current) => ({
          current,
          query:
            current?.url ??
            `${current?.givenName ?? ''} ${current?.familyName ?? ''}`.trim(),
        })),
        filter(({ query }) => Boolean(query)),
        distinctUntilChanged((a, b) => a.query === b.query),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ current, query }) => {
        this.loadWiki(current, query);
        this.loadOpenF1(current);
      });
  }

  private loadWiki(current: Driver | null, query: string) {
    this.wikiLoading.set(true);
    this.wikiError.set(null);
    const source$ = current?.url
      ? this.wikiService.getSummaryByUrl(current.url, 'es')
      : this.wikiService.getSummaryBySearch(query, 'es');
    source$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (summary: WikiSummary | null) => {
        this.wiki.set(summary);
        this.wikiLoading.set(false);
        if (!summary) {
          this.wikiError.set('Sin información adicional.');
        }
      },
      error: () => {
        this.wikiLoading.set(false);
        this.wikiError.set('No se pudo cargar información adicional.');
      },
    });
  }

  private loadOpenF1(current: Driver | null) {
    this.openF1Loading.set(true);
    this.openF1Error.set(null);
    this.openF1Service
      .getLatestDrivers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (drivers) => {
          const fullName = `${current?.givenName ?? ''} ${current?.familyName ?? ''}`.trim();
          const match = drivers.find((d) =>
            `${d.first_name ?? ''} ${d.last_name ?? ''}`.trim().toLowerCase() ===
              fullName.toLowerCase()
          );
          this.openF1.set(match ?? null);
          this.openF1Loading.set(false);
          if (!match) {
            this.openF1Error.set('Sin datos deportivos adicionales.');
          }
        },
        error: () => {
          this.openF1Loading.set(false);
          this.openF1Error.set('No se pudo cargar datos deportivos.');
        },
      });
  }

  goBack() {
    this.location.back();
  }
}
