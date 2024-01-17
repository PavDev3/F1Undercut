import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DriversService } from './data-access/drivers.service';

@Component({
  standalone: true,
  selector: 'app-drivers-list',
  imports: [RouterLink],
  template: `<h1>Driver List</h1>
    <h2>Season {{ driversService.season() }}</h2>
    <ul>
      @for (driver of driversService.drivers(); track driver.driverId) {
      <li>
        #{{ driver.permanentNumber }}

        {{ driver.givenName }}
        {{ driver.familyName }} ,
        {{ driver.nationality }}
      </li>
      }
    </ul>

    <button routerLink="/home">Home</button> `,
})
export class DriversListComponent {
  driversService = inject(DriversService);
}
