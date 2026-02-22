export interface Country {
  id: string; // Unique slug: "taiwan", "united-states"
  name: string; // Display name: "Taiwan", "United States"
  region: string; // "Asia", "Europe", "Africa", etc.
  mapId: string; // ISO code for react-simple-maps: "TWN", "USA"
}

export interface CompletedCountry {
  countryId: string;
  completedAt: string; // ISO date string
  mealCooked?: string; // Optional: what they actually made
}

export interface AppState {
  completedCountries: CompletedCountry[];
  currentCountry: string | null;
  currentMeals: string[];
}
