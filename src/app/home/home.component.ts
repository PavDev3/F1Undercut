import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { formulaService } from '../Service/data/formulaService';
import { CurrentComponent } from './body/current.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div>
      <h1>F1 Api</h1>
      <app-current [MRData]="formulaService.MRData()"></app-current>
    </div>
    <router-outlet></router-outlet>
  `,
  imports: [CurrentComponent, RouterOutlet, CurrentComponent],
})
export class HomeComponent {
  formulaService = inject(formulaService);
}
