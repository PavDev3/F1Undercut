import { Component, Input } from '@angular/core';
import { MRData } from '../../Service/interface/formulaApi';

@Component({
  standalone: true,
  selector: 'app-current',
  template: `
    <h1>Ultimo resultado:</h1>
    <p>Ronda: {{ MRData.RaceTable.round }}</p>
    <p>Temporada: {{ MRData.RaceTable.season }}</p>
    <p>Gran Premio: {{ MRData.RaceTable.Races[0].raceName }}</p>
    <p>Circuito: {{ MRData.RaceTable.Races[0].Circuit.circuitName }}</p>
    <h2></h2>
  `,
})
export class CurrentComponent {
  @Input() MRData!: MRData;
}
