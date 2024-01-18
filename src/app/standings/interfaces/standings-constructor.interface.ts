export interface StandingsLists {
  season: string;
  round: string;
  ConstructorStandings: ConstructorStandings[];
}

export interface ConstructorStandings {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

// ------------------------------

export interface StandingsConstructorsResponse {
  MRData: {
    StandingsTable: {
      season: string;
      StandingsLists: StandingsLists[];
    };
  };
}
