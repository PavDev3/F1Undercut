import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DriversService } from './data-access/drivers.service';
import { FlagClassPipe } from '../../shared/pipes/flag-class.pipe';
import { MotionRevealDirective } from '../../shared/directives/motion-reveal.directive';

@Component({
  standalone: true,
  selector: 'app-drivers-list',
  imports: [RouterLink, FlagClassPipe, MotionRevealDirective],
  templateUrl: './ui/drivers-list.component.html',
  styleUrls: ['./ui/drivers-list.component.scss'],
})
export class DriversListComponent {
  driversService = inject(DriversService);
}
