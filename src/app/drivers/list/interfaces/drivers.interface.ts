export interface Driver {
  driverId: string;
  permanentNumber: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface DriversBySeason {
  season: string;
  drivers: Driver[];
}

// ------------------------------

export interface DriversResponse {
  MRData: {
    DriverTable: {
      season: string;
      Drivers: Driver[];
    };
  };
}
