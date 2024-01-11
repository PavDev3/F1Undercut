import { Component, Input } from '@angular/core';
import { MRData, RaceTable } from '../../Service/interface/formulaApi';

@Component({
  standalone: true,
  selector: 'app-racetable',

  template: `
    <h1>Ultimo resultado:</h1>
    <p>Ronda: {{ MRData.raceTable.round }}</p>
    <p>Temporada: {{ raceTable.season }}</p>
  `,
})
export class RaceTableComponent {
  @Input() raceTable!: RaceTable;
  @Input() MRData!: MRData;
}
