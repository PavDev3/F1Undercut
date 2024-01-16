import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-last-results-list',
  imports: [RouterLink],
  template: `<h1>Last Results</h1>
    <button routerLink="/home">Home</button>`,
})
export class LastResultsComponent {}
