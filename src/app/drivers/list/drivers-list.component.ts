import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DriversService } from './data-access/drivers.service';

@Component({
  standalone: true,
  selector: 'app-drivers-list',
  imports: [RouterLink],
  template: ` <div class="container">
    <h1>Driver List</h1>
    <h2>Season {{ driversService.season() }}</h2>
    <table class="driverList">
      <thead>
        <tr>
          <th>Number</th>
          <th>Driver</th>
          <th>Nationality</th>
        </tr>
      </thead>
      <tbody>
        @for (driver of driversService.drivers(); track driver.driverId) {
        <tr>
          <td>{{ driver.permanentNumber }}</td>
          <td>
            {{ driver.givenName }}
            {{ driver.familyName }}
          </td>
          <td>
            {{ driver.nationality }}
          </td>
        </tr>
        }
      </tbody>
    </table>
    <button routerLink="/home">Home</button>
  </div>`,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      table {
        width: 45%;
        margin-top: 20px;
        border-collapse: collapse;
      }

      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
      }

      button {
        margin-top: 20px;
      }
    `,
  ],
})
export class DriversListComponent {
  driversService = inject(DriversService);
}
