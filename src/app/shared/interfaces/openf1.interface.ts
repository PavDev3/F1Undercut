export interface OpenF1Driver {
  driver_number?: number;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  team_name?: string;
  team_colour?: string;
  headshot_url?: string;
  country_code?: string;
}

export interface OpenF1Meeting {
  meeting_name?: string;
  circuit_short_name?: string;
  circuit_type?: string;
  circuit_image?: string;
  location?: string;
  country_name?: string;
  year?: number;
}
