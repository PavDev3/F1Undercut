export interface ResultsSchedule {
  season: string;
  Races: Race[];
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  Results: Results[];
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

export interface Results {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: Time;
  FastestLap: FastestLap;
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  nationality: string;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface FastestLap {
  rank: string;
  lap: string;
  Time: Time;
  AverageSpeed: AverageSpeed;
}
export interface Time {
  millis: string;
  time: string;
}

export interface AverageSpeed {
  units: string;
  speed: string;
}

export interface ResultsResponse {
  MRData: {
    RaceTable: {
      season: string;
      round: string;
      Races: Race[];
    };
  };
}
