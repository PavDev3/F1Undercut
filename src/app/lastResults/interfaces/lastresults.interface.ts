import { Driver } from '../../drivers/list/interfaces/drivers.interface';
import { Circuit } from '../../schedule/interfaces/schedule.interface';
import { Constructor } from '../../standings/interfaces/standings-constructor.interface';

export interface CurrentBysSeason {
  season: string;
  round: string;
  Races: Races[];
}

export interface Races {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit[];
}

export interface Results {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver[];
  Constructor: Constructor[];
  grid: string;
  laps: string;
  status: string;
  Time: Time[];
  FastestLap: FastestLap[];
}

export interface Time {
  millis: string;
  time: string;
}

export interface FastestLap {
  rank: string;
  lap: string;
  Time: Time[];
  AverageSpeed: AverageSpeed[];
}

export interface AverageSpeed {
  units: string;
  speed: string;
}

export interface currentResponse {
  MRData: {
    RaceTable: {
      season: string;
      round: string;
      Races: Races[];
    };
  };
}
