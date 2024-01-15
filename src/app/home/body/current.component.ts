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
    <a href="{{ MRData.RaceTable.Races[0].Circuit.url }}"
      >Circuito: {{ MRData.RaceTable.Races[0].Circuit.circuitName }}</a
    >
    <p>
      {{ MRData.RaceTable.Races[0].Results[0].position }} :
      {{ MRData.RaceTable.Races[0].Results[0].Driver.givenName }}
      {{ MRData.RaceTable.Races[0].Results[0].Driver.familyName }} #{{
        MRData.RaceTable.Races[0].Results[0].Driver.permanentNumber
      }}
    </p>
  `,
})
export class CurrentComponent {
  @Input() MRData!: MRData;
}
