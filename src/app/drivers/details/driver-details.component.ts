import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from '../../shared/date-format.pipe';
import { DriversService } from '../list/data-access/drivers.service';
import { Driver } from '../list/interfaces/drivers.interface';

@Component({
  standalone: true,
  selector: 'driver-details',
  template: `
    <div>
      <h2>Driver Details</h2>
      <div>
        <strong>Driver Name:</strong> {{ driver.givenName }}
        {{ driver.familyName }}
      </div>
      <div><strong>Nationality:</strong> {{ driver.nationality }}</div>
      <div><strong>Permanent Number:</strong> {{ driver.permanentNumber }}</div>
      <div>
        <strong>Date of birth:</strong> {{ driver.dateOfBirth | dateFormat }}
      </div>
      <div>
        <strong>Wikipedia:</strong>
        <a [href]="driver.url" target="_blank"> {{ driver.url }}</a>
      </div>
    </div>
  `,
  styles: [
    `
      div {
        margin: 20px;
      }
    `,
  ],
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
