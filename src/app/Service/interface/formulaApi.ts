export interface formulaApi {
  MRData: MRData;
}

export interface MRData {
  url: string;
  limit: string;
  offset: string;
  total: string;
  // raceTable: RaceTable;
}

export interface RaceTable {
  season: string;
  round: string;
  races: Race[];
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  //   Circuit: Circuit;
  //   date: Date;
  //   results: Result[];
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  location: Location;
}

export interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface Result {
  number: string;
  position: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: Status;
  time?: ResultTime;
  fastestLap: FastestLap;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  nationality: string;
}

export interface FastestLap {
  rank: string;
  lap: string;
  time: FastestLapTime;
  averageSpeed: AverageSpeed;
}

export interface AverageSpeed {
  units: Units;
  speed: string;
}

export enum Units {
  Kph = 'km/h',
}

export interface FastestLapTime {
  time: string;
}

export interface ResultTime {
  time: string;
}

export enum Status {
  Finished = 'Finished',
  Retired = 'Retired',
  The1Lap = '+1 Lap',
}
