import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-teams-list',
  imports: [RouterLink],
  template: `<h1>Teams</h1>
    <button routerLink="/home">Home</button>`,
})
export class TeamsListComponent {}
