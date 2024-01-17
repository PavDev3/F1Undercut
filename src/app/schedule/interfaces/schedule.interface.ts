export interface ScheduleBySeason {
  season: string;
  races: Races[];
}

// -- Races ---
export interface Races {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  FirstPractice: FirstPractice;
  SecondPractice: SecondPractice;
  ThirdPractice: ThirdPractice;
  Qualifying: Qualifying;
}

// --- Circuit ---
export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

// --- Location ---
export interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

// --- FirstPractice ---
export interface FirstPractice {
  date: string;
  time: string;
}

// --- SecondPractice ---
export interface SecondPractice {
  date: string;
  time: string;
}

// --- ThirdPractice ---
export interface ThirdPractice {
  date: string;
  time: string;
}

// --- Qualifying ---
export interface Qualifying {
  date: string;
  time: string;
}

// ------------------------------

export interface ScheduleResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: Races[];
    };
  };
}
