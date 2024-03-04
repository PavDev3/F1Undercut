export interface ScheduleBySeason {
  season: string;
  races: Race[];
}

// -- Races ---
export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time?: string;
  FirstPractice?: FirstPractice;
  Qualifying?: Qualifying;
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
  time?: string;
}

// --- SecondPractice ---

// --- ThirdPractice ---

// --- Qualifying ---
export interface Qualifying {
  time?: string;
}

// ------------------------------

export interface ScheduleResponse {
  MRData: {
    RaceTable: {
      season: string;
      Races: Race[];
    };
  };
}
