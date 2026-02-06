import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SeasonStoreService } from '../data-access/season-store.service';

@Component({
  standalone: true,
  selector: 'app-season-selector',
  imports: [NgFor, NgIf],
  template: `
    <div class="season-bar" *ngIf="seasonStore.seasons().length > 0">
      <div class="label">Temporada</div>
      <select
        [value]="seasonStore.selectedSeason()"
        (change)="onSeasonChange($event)"
      >
        <option *ngFor="let s of seasonStore.seasons()" [value]="s.season">
          {{ s.season }}
        </option>
      </select>
    </div>
  `,
  styleUrls: ['./season-selector.component.scss'],
})
export class SeasonSelectorComponent {
  seasonStore = inject(SeasonStoreService);

  onSeasonChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value) {
      this.seasonStore.setSeason(value);
    }
  }
}
