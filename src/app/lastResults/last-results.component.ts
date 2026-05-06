import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CurrentService } from './data-access/last-results.service';
import { MotionRevealDirective } from '../shared/directives/motion-reveal.directive';
import { CountUpDirective } from '../shared/directives/count-up.directive';
import { StatusEsPipe } from '../shared/pipes/status-es.pipe';
import { Results } from './interfaces/last-results.interface';

export const CONSTRUCTOR_COLORS: Record<string, string> = {
  red_bull:     '#1E40AF',
  ferrari:      '#DC0000',
  mercedes:     '#27F4D2',
  mclaren:      '#FF8000',
  aston_martin: '#229971',
  alpine:       '#FF87BC',
  williams:     '#64C4FF',
  rb:           '#6692FF',
  sauber:       '#52E252',
  haas:         '#B6BABD',
};

@Component({
  standalone: true,
  selector: 'app-last-results-list',
  templateUrl: './ui/last-results.component.html',
  styleUrls: ['./ui/last-results.component.scss'],
  imports: [RouterLink, DecimalPipe, MotionRevealDirective, CountUpDirective, StatusEsPipe],
})
export class LastResultsComponent implements OnInit {
  currentService = inject(CurrentService);

  readonly speedLineItems = Array.from({ length: 18 }, (_, i) => i);

  podiumVisible = signal<boolean[]>([false, false, false]);

  readonly podiumOrder = [
    { idx: 2, height: 150 },
    { idx: 0, height: 220 },
    { idx: 1, height: 180 },
  ];

  podium = computed<Results[]>(() => {
    const races = this.currentService.Races();
    if (!races.length) return [];
    return races[0].Results.slice(0, 3);
  });

  winner = computed<Results | null>(() => this.podium()[0] ?? null);

  fastestLap = computed<Results | null>(() => {
    const races = this.currentService.Races();
    if (!races.length) return null;
    return races[0].Results.find(r => r.FastestLap?.rank === '1') ?? null;
  });

  pole = computed<Results | null>(() => {
    const races = this.currentService.Races();
    if (!races.length) return null;
    return races[0].Results.find(r => r.grid === '1') ?? null;
  });

  raceName = computed(() => this.currentService.Races()[0]?.raceName ?? '');

  circuitShort = computed(() => {
    const name = this.currentService.Races()[0]?.Circuit?.circuitName ?? '';
    return name.split(' ').pop()?.toUpperCase() ?? name.toUpperCase();
  });

  circuitName = computed(() =>
    this.currentService.Races()[0]?.Circuit?.circuitName ?? '');

  raceDate = computed(() =>
    this.currentService.Races()[0]?.date ?? '');

  totalLaps = computed(() =>
    this.currentService.Races()[0]?.Results[0]?.laps ?? '—');

  ngOnInit() {
    let revealed = false;
    const interval = setInterval(() => {
      if (revealed || this.currentService.loading()) return;
      if (this.currentService.Races().length) {
        revealed = true;
        clearInterval(interval);
        setTimeout(() => this.podiumVisible.update(v => { v[2] = true; return [...v]; }), 200);
        setTimeout(() => this.podiumVisible.update(v => { v[1] = true; return [...v]; }), 600);
        setTimeout(() => this.podiumVisible.update(v => { v[0] = true; return [...v]; }), 1000);
      }
    }, 100);
  }

  constructorColor(constructorId: string | undefined): string {
    return CONSTRUCTOR_COLORS[constructorId ?? ''] ?? 'var(--border-2)';
  }

  gridDelta(result: Results): number {
    const pos = parseInt(result.position, 10);
    const grid = parseInt(result.grid, 10);
    return grid - pos;
  }
}
