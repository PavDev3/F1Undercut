export interface Tracks {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

export interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface TracksBySeason {
  season: string;
  tracks: Tracks[];
}

// ------------------------------

export interface TracksResponse {
  MRData: {
    CircuitTable: {
      season: string;
      Circuits: Tracks[];
    };
  };
}
