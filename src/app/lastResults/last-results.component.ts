import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CurrentService } from './data-access/last-results.service';

@Component({
  standalone: true,
  selector: 'app-last-results-list',
  templateUrl: './ui/last-results.component.html',
  styleUrls: ['./ui/last-results.component.scss'],
  imports: [RouterLink, HeaderComponent],
})
export class LastResultsComponent {
  currentService = inject(CurrentService);
}
