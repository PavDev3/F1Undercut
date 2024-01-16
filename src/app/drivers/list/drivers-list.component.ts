import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DriversBySeason } from './interfaces/drivers.interface';

@Component({
  standalone: true,
  selector: 'app-drivers-list',
  imports: [RouterLink],
  template: `<h1>Driver List</h1>
    <h2>Season {{ driversBySeason.season }}</h2>
    <ul>
      <li></li>
    </ul>
    <button routerLink="/home">Home</button> `,
})
export class DriversListComponent {
  @Input() driversBySeason!: DriversBySeason;
}
