import { Component, Input } from '@angular/core';
import { MRData } from '../../Service/interface/formulaApi';

@Component({
  standalone: true,
  selector: 'app-current',
  template: `
    <h1>Ultimo resultado:</h1>
    <p>Limite {{ MRData.limit }}</p>
    <p>Total {{ MRData.total }}</p>
    <p>Url {{ MRData.url }}</p>
    <p>Offset {{ MRData.offset }}</p>
    <p>Ronda: {{ MRData.raceTable.round }}</p>
  `,
})
export class CurrentComponent {
  @Input() MRData!: MRData;
}
