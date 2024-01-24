import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'last-results',
    pathMatch: 'full',
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
  {
    path: 'driver-details/:id',
    loadComponent: () =>
      import('./drivers/details/driver-details.component').then(
        (m) => m.DriverDetailsComponent
      ),
  },
  {
    path: 'track-details/:id',
  },
];
