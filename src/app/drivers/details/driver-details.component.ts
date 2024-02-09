import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from '../../shared/date-format.pipe';
import { DriversService } from '../list/data-access/drivers.service';
import { Driver } from '../list/interfaces/drivers.interface';

@Component({
  standalone: true,
  selector: 'driver-details',
  templateUrl: './ui/driver-details.component.html',
  imports: [DateFormatPipe],
})
export class DriverDetailsComponent implements OnInit {
  // Necesito el driverId para obtener el driver
  driverId!: string;
  // Obtengo el driver de mi interface
  driver!: Driver;

  constructor(
    private route: ActivatedRoute,
    private driversService: DriversService
  ) {}

  ngOnInit() {
    // Obtener el driverId de la ruta
    this.driverId = this.route.snapshot.paramMap.get('id')!;

    if (this.driverId) {
      this.loadDriverDetails();
    }
  }

  loadDriverDetails() {
    // Obtener el driver por su id
    this.driver =
      this.driversService.getDriverById(this.driverId) ?? ({} as Driver);

    if (!this.driver) {
      console.log('No se encontró el driver');
    }
  }
}
