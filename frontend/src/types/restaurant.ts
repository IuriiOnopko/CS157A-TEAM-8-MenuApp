/**
 * Shape of a restaurant as the Home page needs it.
 */
export type OperatingStatus = "Open" | "Closed";

export type PriceLevel = "$" | "$$" | "$$$";

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  cuisine: string;
  status: OperatingStatus;
  priceLevel: PriceLevel;
  distanceMiles: number;
  /** Latitude/longitude used to plot the restaurant on the Leaflet map. */
  lat: number;
  lng: number;
  /**
   * Placeholder swatch color standing in for a restaurant photo until
   * real images come from the backend/DB.
   */
  swatchColor: string;
}
