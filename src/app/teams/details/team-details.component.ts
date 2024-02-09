import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstructorsService } from '../list/data-access/teams.service';
import { Constructors } from '../list/interfaces/teams.interface';

@Component({
  standalone: true,
  selector: 'team-details',
  templateUrl: './ui/team-details.component.html',
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
