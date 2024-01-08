import { Component, Input } from '@angular/core';
import { RaceTable } from '../../Service/interface/formulaApi';

@Component({
  standalone: true,
  selector: 'app-current',
  template: ` <h1>Current</h1>
    <p>Current: {{ raceTable.round }}</p>`,
})
export class CurrentComponent {
  @Input() raceTable!: RaceTable;
}
