import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CurrentService } from '../lastResults/data-access/last-results.service';
import { SeasonStoreService } from '../shared/data-access/season-store.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgFor],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private currentService = inject(CurrentService);
  seasonStore = inject(SeasonStoreService);

  isMenuOpen = false;

  get round() { return this.currentService.round(); }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu()  { this.isMenuOpen = false; }

  onSeasonChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value) this.seasonStore.setSeason(value);
  }
}
