import { Component, inject } from '@angular/core';
import { CurrentService } from './data-access/last-results.service';
import { MotionRevealDirective } from '../shared/directives/motion-reveal.directive';
import { CountUpDirective } from '../shared/directives/count-up.directive';
import { StatusEsPipe } from '../shared/pipes/status-es.pipe';

@Component({
  standalone: true,
  selector: 'app-last-results-list',
  templateUrl: './ui/last-results.component.html',
  styleUrls: ['./ui/last-results.component.scss'],
  imports: [MotionRevealDirective, CountUpDirective, StatusEsPipe],
})
export class LastResultsComponent {
  currentService = inject(CurrentService);
}
