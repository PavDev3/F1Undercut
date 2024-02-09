import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConstructorsService } from './data-access/teams.service';

@Component({
  standalone: true,
  selector: 'app-teams-list',
  imports: [RouterLink],
  templateUrl: './ui/teams-list.component.html',
  styleUrls: ['./ui/teams-list.component.scss'],
})
export class TeamsListComponent {
  constructorsService = inject(ConstructorsService);
}
