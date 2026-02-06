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
    data: { animation: 'drivers' },
  },
  {
    path: 'standings',
    loadComponent: () =>
      import('./standings/standings-list.component').then(
        (m) => m.StandingsListComponent
      ),
    data: { animation: 'standings' },
  },
  {
    path: 'schedule',
    loadComponent: () =>
      import('./schedule/list/schedule-list.component').then(
        (m) => m.ScheduleListComponent
      ),
    data: { animation: 'schedule' },
  },
  {
    path: 'teams',
    loadComponent: () =>
      import('./teams/list/teams-list.component').then(
        (m) => m.TeamsListComponent
      ),
    data: { animation: 'teams' },
  },
  {
    path: 'last-results',
    loadComponent: () =>
      import('./lastResults/last-results.component').then(
        (m) => m.LastResultsComponent
      ),
    data: { animation: 'results' },
  },
  {
    path: 'tracks',
    loadComponent: () =>
      import('./tracks/list/tracks-list.component').then(
        (m) => m.TrackListComponent
      ),
    data: { animation: 'tracks' },
  },
  {
    path: 'driver-details/:id',
    loadComponent: () =>
      import('./drivers/details/driver-details.component').then(
        (m) => m.DriverDetailsComponent
      ),
    data: { animation: 'driver-details' },
  },
  {
    path: 'track-details/:id',
    loadComponent: () =>
      import('./tracks/details/track-details.component').then(
        (m) => m.TrackDetailsComponent
      ),
    data: { animation: 'track-details' },
  },
  {
    path: 'team-details/:id',
    loadComponent: () =>
      import('./teams/details/team-details.component').then(
        (m) => m.TeamDetailsComponent
      ),
    data: { animation: 'team-details' },
  },
  {
    path: 'results/:id',
    loadComponent: () =>
      import('./schedule/details/schedule-details.component').then(
        (m) => m.ScheduleDetailsComponent
      ),
    data: { animation: 'schedule-details' },
  },
];
