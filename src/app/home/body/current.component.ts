import { Component, Input } from '@angular/core';
import { FData } from '../../Service/interface/formulaApi';

@Component({
  standalone: true,
  selector: 'app-current',
  template: ` <h1>Current</h1> `,
})
export class CurrentComponent {
  @Input() FData!: FData;
}
