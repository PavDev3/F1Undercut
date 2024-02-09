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
      import('./schedule/list/schedule-list.component').then(
        (m) => m.ScheduleListComponent
      ),
  },
  {
    path: 'teams',
    loadComponent: () =>
      import('./teams/list/teams-list.component').then(
        (m) => m.TeamsListComponent
      ),
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
      import('./tracks/list/tracks-list.component').then(
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
    loadComponent: () =>
      import('./tracks/details/track-details.component').then(
        (m) => m.TrackDetailsComponent
      ),
  },
  {
    path: 'team-details/:id',
    loadComponent: () =>
      import('./teams/details/team-details.component').then(
        (m) => m.TeamDetailsComponent
      ),
  },
  {
    path: 'results/:id',
    loadComponent: () =>
      import('./schedule/details/schedule-details.component').then(
        (m) => m.ScheduleDetailsComponent
      ),
  },
];
