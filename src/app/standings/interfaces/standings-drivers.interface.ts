export interface StandingsTable {
  season: string;
  StandingsLists: StandingsLists[];
}

export interface StandingsLists {
  season: string;
  round: string;
  DriverStandings: DriverStandings[];
}

export interface DriverStandings {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructors[];
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Constructors {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

// ------------------------------

export interface StandingsDriversResponse {
  MRData: {
    StandingsTable: {
      season: string;
      StandingsLists: StandingsLists[];
    };
  };
}
