import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstructorsService } from '../data-access/teams.service';
import { Constructors } from '../interfaces/teams.interface';

@Component({
  standalone: true,
  selector: 'team-details',
  template: `
    <div>
      <h2>Team Details</h2>
    </div>
    <div><strong>Constructor Name:</strong> {{ team.name }}</div>
    <div><strong>Nationality:</strong> {{ team.nationality }}</div>
    <div>
      <strong>Wikipedia:</strong>
      <a [href]="team.url" target="_blank"> {{ team.url }}</a>
    </div>
  `,
  styles: [
    `
      div {
        margin: 20px;
      }
    `,
  ],
})
export class TeamDetailsComponent {
  constructorId!: string;
  team!: Constructors;

  constructor(
    private route: ActivatedRoute,
    private constructorsService: ConstructorsService
  ) {}

  ngOnInit() {
    this.constructorId = this.route.snapshot.paramMap.get('id')!;
    if (this.constructorId) {
      this.loadConstructorDetails();
    }
  }

  loadConstructorDetails() {
    this.team =
      this.constructorsService.getConstructorById(this.constructorId) ??
      ({} as Constructors);

    if (!this.team) {
      console.log('No constructor found');
    }
  }
}
