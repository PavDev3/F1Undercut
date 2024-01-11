import { Component, Input } from '@angular/core';
import { MRData } from '../../Service/interface/formulaApi';

@Component({
  standalone: true,
  selector: 'app-current',
  template: `
    <h1>Current</h1>
    <p>{{ MRData.total }}</p>
    <p>{{ MRData.url }}</p>
  `,
})
export class CurrentComponent {
  @Input() MRData!: MRData;
}
