import { Component, DestroyRef, Injector, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { TracksService } from '../list/data-access/tracks.service';
import { Tracks, TracksResponse } from '../list/interfaces/tracks.interface';
import { WikiSummaryService } from '../../shared/data-access/wiki-summary.service';
import { WikiSummary } from '../../shared/interfaces/wiki-summary.interface';
import { FlagClassPipe } from '../../shared/pipes/flag-class.pipe';
import { NationalityEsPipe } from '../../shared/pipes/nationality-es.pipe';
import { OpenF1Service } from '../../shared/data-access/openf1.service';
import { OpenF1Meeting } from '../../shared/interfaces/openf1.interface';
import { SeasonStoreService } from '../../shared/data-access/season-store.service';

@Component({
  standalone: true,
  selector: 'track-details',
  templateUrl: './ui/track-details.component.html',
  styleUrls: ['./ui/track-details.component.scss'],
  imports: [FlagClassPipe, NationalityEsPipe],
})
export class TrackDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seasonStore = inject(SeasonStoreService);
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);
  private location = inject(Location);
  tracksService = inject(TracksService);
  private wikiService = inject(WikiSummaryService);
  private openF1Service = inject(OpenF1Service);

  circuitId = signal<string>('');
  track = signal<Tracks | null>(null);
  wiki = signal<WikiSummary | null>(null);
  wikiLoading = signal(false);
  wikiError = signal<string | null>(null);
  openF1 = signal<OpenF1Meeting | null>(null);
  openF1Loading = signal(false);
  openF1Error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.circuitId.set(id);

    toObservable(this.seasonStore.selectedSeason, { injector: this.injector })
      .pipe(
        filter((season) => Boolean(season)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((season) => {
        const cached = this.tracksService.getTrackById(id);
        if (cached) {
          this.track.set(cached);
          return;
        }
        this.tracksService
          .fetchTrackById(season, id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((response: TracksResponse) => {
            const found = response.MRData.CircuitTable.Circuits?.[0] ?? null;
            this.track.set(found);
          });
      });

    toObservable(this.track, { injector: this.injector })
      .pipe(
        map((current) => ({
          current,
          query: current?.url ?? current?.circuitName ?? '',
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

  private loadWiki(current: Tracks | null, query: string) {
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

  private loadOpenF1(current: Tracks | null) {
    this.openF1Loading.set(true);
    this.openF1Error.set(null);
    const season = this.seasonStore.selectedSeason();
    this.openF1Service
      .getMeetingsByYear(season || '2025')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (meetings) => {
          const country = current?.Location?.country ?? '';
          const name = current?.circuitName ?? '';
          const match =
            meetings.find(
              (m) =>
                (m.country_name ?? '').toLowerCase() === country.toLowerCase()
            ) ||
            meetings.find(
              (m) =>
                (m.circuit_short_name ?? '').toLowerCase() ===
                name.toLowerCase()
            ) ||
            null;
          this.openF1.set(match);
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
