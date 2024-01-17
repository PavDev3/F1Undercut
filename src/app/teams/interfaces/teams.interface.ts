export interface Constructors {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface ConstructorsBySeason {
  season: string;
  constructors: Constructors[];
}

// ------------------------------

export interface ConstructorsResponse {
  MRData: {
    ConstructorTable: {
      season: string;
      Constructors: Constructors[];
    };
  };
}
