import { Restaurant } from "../types/restaurant";

/**
 * ============================================================================
 *  BACKEND INTEGRATION POINT — nothing below is real server/DB logic.
 * ============================================================================
 *
 * This file is intentionally just a thin frontend stub. Everything here
 * returns mock/hardcoded data so the Home page has something to render.
 *
 */

export interface SearchParams {
  query?: string;
  cuisine?: string;
  location?: string;
}

/** TODO(backend): replace with GET /api/restaurants */
export async function getRestaurants(): Promise<Restaurant[]> {
  return Promise.resolve([]);
}

/** TODO(backend): replace with GET /api/restaurants/search?... (name, cuisine, location, menu items, multi-key search) */
export async function searchRestaurants(
  params: SearchParams
): Promise<Restaurant[]> {
  return Promise.resolve([]);
}

/** TODO(backend): replace with GET /api/restaurants/count (live count from the DB) */
export async function getRestaurantCount(): Promise<number> {
  return Promise.resolve(0);
}
