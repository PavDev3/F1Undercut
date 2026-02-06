import { Component, DestroyRef, Injector, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ConstructorsService } from '../list/data-access/teams.service';
import { Constructors, ConstructorsResponse } from '../list/interfaces/teams.interface';
import { WikiSummaryService } from '../../shared/data-access/wiki-summary.service';
import { WikiSummary } from '../../shared/interfaces/wiki-summary.interface';
import { FlagClassPipe } from '../../shared/pipes/flag-class.pipe';
import { NationalityEsPipe } from '../../shared/pipes/nationality-es.pipe';
import { OpenF1Service } from '../../shared/data-access/openf1.service';
import { OpenF1Driver } from '../../shared/interfaces/openf1.interface';
import { SeasonStoreService } from '../../shared/data-access/season-store.service';

@Component({
  standalone: true,
  selector: 'team-details',
  templateUrl: './ui/team-details.component.html',
  styleUrls: ['./ui/team-details.component.scss'],
  imports: [FlagClassPipe, NationalityEsPipe],
})
export class TeamDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seasonStore = inject(SeasonStoreService);
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);
  private location = inject(Location);
  constructorsService = inject(ConstructorsService);
  private wikiService = inject(WikiSummaryService);
  private openF1Service = inject(OpenF1Service);

  constructorId = signal<string>('');
  team = signal<Constructors | null>(null);
  wiki = signal<WikiSummary | null>(null);
  wikiLoading = signal(false);
  wikiError = signal<string | null>(null);
  openF1 = signal<OpenF1Driver | null>(null);
  openF1Loading = signal(false);
  openF1Error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.constructorId.set(id);

    toObservable(this.seasonStore.selectedSeason, { injector: this.injector })
      .pipe(
        filter((season) => Boolean(season)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((season) => {
        const cached = this.constructorsService.getConstructorById(id);
        if (cached) {
          this.team.set(cached);
          return;
        }
        this.constructorsService
          .fetchConstructorById(season, id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((response: ConstructorsResponse) => {
            const found =
              response.MRData.ConstructorTable.Constructors?.[0] ?? null;
            this.team.set(found);
          });
      });

    toObservable(this.team, { injector: this.injector })
      .pipe(
        map((current) => ({
          current,
          query: current?.url ?? current?.name ?? '',
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

  private loadWiki(current: Constructors | null, query: string) {
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

  private loadOpenF1(current: Constructors | null) {
    this.openF1Loading.set(true);
    this.openF1Error.set(null);
    this.openF1Service
      .getLatestDrivers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (drivers) => {
          const match = drivers.find(
            (d) =>
              (d.team_name ?? '').toLowerCase() ===
              (current?.name ?? '').toLowerCase()
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
