export interface Season {
  season: string;
  url?: string;
}

export interface SeasonsResponse {
  MRData: {
    total?: string;
    SeasonTable: {
      Seasons: Season[];
    };
  };
}
