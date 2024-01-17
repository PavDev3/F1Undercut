import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConstructorsService } from './data-access/teams.service';

@Component({
  standalone: true,
  selector: 'app-teams-list',
  imports: [RouterLink],
  template: `<h1>Teams</h1>
    <h2>Season {{ constructorsService.season() }}</h2>
    <ul>
      @for (constructor of constructorsService.constructors(); track
      constructor.constructorId) {
      <li>{{ constructor.name }}, {{ constructor.nationality }}</li>
      }
    </ul>
    <button routerLink="/home">Home</button>`,
})
export class TeamsListComponent {
  constructorsService = inject(ConstructorsService);
}
