import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";
import StatsPanel from "../components/StatsPanel";
import ViewToggle, { ViewMode } from "../components/ViewToggle";
import RestaurantList from "../components/RestaurantList";
import MapView from "../components/MapView";
import Footer from "../components/Footer";
import { Restaurant } from "../types/restaurant";
import { getRestaurants, searchRestaurants } from "../api/restaurants";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [view, setView] = useState<ViewMode>("split");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO(backend): getRestaurants() currently returns mock data.
    // Swap its implementation in src/api/restaurants.ts once
    // GET /api/restaurants (Tomcat/Java -> MySQL) is available.
    getRestaurants().then((data) => {
      setRestaurants(data);
      setLoading(false);
    });
  }, []);

  async function handleSearch(query: string, location: string) {
    setLoading(true);
    // TODO(backend): pass `location` through once server-side location
    // search is implemented (see SearchParams in src/api/restaurants.ts).
    const results = await searchRestaurants({ query, location });
    setRestaurants(results);
    setLoading(false);
  }

  const showListPane = view === "split" || view === "list";
  const showMapPane = view === "split" || view === "map";

  return (
    <div className="min-h-screen flex flex-col bg-cream font-body text-ink">
      <Header />

      {/* Hero */}
      <section className="max-w-6xl mx-auto w-full px-6 md:px-10 pt-14 pb-8 flex flex-col md:flex-row gap-10 md:gap-14 items-start">
        <div className="flex-[1.1] flex flex-col gap-5 min-w-0 w-full">
          <div className="inline-flex items-center gap-2 bg-[#EFF3EA] rounded-full px-3.5 py-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#3BAA6A] live-dot" />
            <span className="text-[13px] font-semibold text-[#3F5A3F]">
              Live menu &amp; availability data
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight tracking-tight m-0">
            Find what's
            <br />
            actually on the menu.
          </h1>

          <p className="m-0 text-[17px] leading-relaxed text-muted max-w-md">
            Search real menus, prices and dietary info across every
            participating restaurant near you
          </p>

          <SearchBar onSearch={handleSearch} />
          <FilterChips />
        </div>

        <div className="flex-[0.85] w-full md:w-auto">
          <StatsPanel />
        </div>
      </section>

      {/* View toggle */}
      <section className="max-w-6xl mx-auto w-full px-6 md:px-10 flex items-center justify-between gap-5 flex-wrap">
        <div className="flex items-center gap-2 text-[13px] text-muted-2">
          <span>Sort:</span>
          <strong className="text-ink">Distance</strong>
        </div>
        <ViewToggle view={view} onChange={setView} />
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto w-full px-6 md:px-10 pt-5 pb-16 flex flex-col md:flex-row gap-6 items-start">
        {loading ? (
          <div className="w-full py-20 text-center text-muted-2 text-sm">
            Loading restaurants…
          </div>
        ) : (
          <>
            {showListPane && (
              <div
                className={
                  view === "list"
                    ? "flex-1 min-w-0 w-full"
                    : "flex-none md:w-[380px] w-full max-h-[560px] overflow-y-auto pr-1"
                }
              >
                <RestaurantList
                  restaurants={restaurants}
                  layout={view === "list" ? "grid" : "sidebar"}
                />
              </div>
            )}
            {showMapPane && (
              <div className="flex-1 min-w-0 w-full">
                <MapView restaurants={restaurants} />
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
