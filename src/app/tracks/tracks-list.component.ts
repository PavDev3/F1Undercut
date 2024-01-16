import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-track-list',
  imports: [RouterLink],
  template: `<h1>Tracks</h1>
    <button routerLink="/home">Home</button>`,
})
export class TrackListComponent {}
