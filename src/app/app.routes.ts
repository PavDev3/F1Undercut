import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'drivers',
    loadComponent: () =>
      import('./drivers/list/drivers-list.component').then(
        (m) => m.DriversListComponent
      ),
  },
  {
    path: 'standings',
    loadComponent: () =>
      import('./standings/standings-list.component').then(
        (m) => m.StandingsListComponent
      ),
  },
  {
    path: 'schedule',
    loadComponent: () =>
      import('./schedule/schedule-list.component').then(
        (m) => m.ScheduleListComponent
      ),
  },
  {
    path: 'teams',
    loadComponent: () =>
      import('./teams/teams-list.component').then((m) => m.TeamsListComponent),
  },
  {
    path: 'last-results',
    loadComponent: () =>
      import('./lastResults/last-results.component').then(
        (m) => m.LastResultsComponent
      ),
  },
  {
    path: 'tracks',
    loadComponent: () =>
      import('./tracks/tracks-list.component').then(
        (m) => m.TrackListComponent
      ),
  },
];
