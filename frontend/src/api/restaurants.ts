/**
 * ============================================================================
 *  BACKEND INTEGRATION POINT
 * ============================================================================
 *
 * Sprint 1 only needs one call: the number of in-network restaurants.
 *
 *   Browser  --GET /api/restaurants/count-->  Tomcat (RestaurantCountServlet)
 *   Tomcat   --SELECT COUNT(*) FROM restaurant-->  MySQL
 *   Browser  <--{ "count": 42 }--  Tomcat
 *
 * The app lives under /menumap (the "homepage" in package.json and the
 * Tomcat context path), so PUBLIC_URL is "/menumap" in both dev and prod.
 * In development, `npm start` proxies the API call to Tomcat on :8080
 * (see "proxy" in package.json), so Tomcat must be running there.
 * Search, menus, and ordering will be added here in later sprints.
 */

/** GET /menumap/api/restaurants/count. Throws if the server or database is unreachable. */
export async function getRestaurantCount(): Promise<number> {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/restaurants/count`);
  if (!res.ok) {
    throw new Error(`Server responded with ${res.status}`);
  }
  const body: { count: number } = await res.json();
  return body.count;
}
