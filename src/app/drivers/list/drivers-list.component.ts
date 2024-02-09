import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DriversService } from './data-access/drivers.service';

@Component({
  standalone: true,
  selector: 'app-drivers-list',
  imports: [RouterLink],
  templateUrl: './ui/drivers-list.component.html',
  styleUrls: ['./ui/drivers-list.component.scss'],
})
export class DriversListComponent {
  driversService = inject(DriversService);
}
