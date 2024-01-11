import { Component, Input } from '@angular/core';
import { MRData } from '../../Service/interface/formulaApi';

@Component({
  standalone: true,
  selector: 'app-current',
  template: `
    <h1>Ultimo resultado:</h1>
    <p>Limite {{ MRData.limit }}</p>
    <p>Ronda: {{ MRData.raceTable.round }}</p>
    <p>Temporada: {{ MRData.raceTable.season }}</p>
  `,
})
export class CurrentComponent {
  @Input() MRData!: MRData;
}
