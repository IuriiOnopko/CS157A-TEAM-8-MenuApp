import React, { FormEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

/**
 * Search by name / cuisine / dish, plus a location field.
 *
 * Proposal calls for search by name, cuisine, location (with permission),
 * menu items, and multi-key (combined) search. This component only
 * collects the query text — the actual multi-key matching logic belongs
 * on the backend once it's wired up (see src/api/restaurants.ts).
 */
export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(query, location);
  }

  function handleUseMyLocation() {
    // TODO(backend): once geolocation is wired to a real search endpoint,
    // request navigator.geolocation.getCurrentPosition here and send
    // lat/lng to GET /api/restaurants/search per the proposal's
    // "Location (if customer grants location permission)" requirement.
    setLocation("Near San Jose, CA");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-stretch gap-2.5 bg-card border-[1.5px] border-border-strong rounded-2xl p-1.5 shadow-[0_6px_20px_rgba(27,33,26,0.05)]"
    >
      <div className="flex items-center gap-2.5 flex-[1.3] px-3.5 py-2 border-r border-border">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#6B7566" strokeWidth="2" />
          <path
            d="M21 21l-4.3-4.3"
            stroke="#6B7566"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search by name, cuisine or dish"
          placeholder="Restaurant, cuisine or dish…"
          className="w-full text-[15px] bg-transparent outline-none placeholder:text-muted-2"
        />
      </div>
      <div className="hidden sm:flex items-center gap-2.5 flex-1 px-3.5 py-2 border-r border-border">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s7-6.1 7-11.5C19 5.9 15.9 3 12 3S5 5.9 5 9.5C5 14.9 12 21 12 21Z"
            stroke="#6B7566"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="9.5" r="2.3" stroke="#6B7566" strokeWidth="2" />
        </svg>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={handleUseMyLocation}
          aria-label="Location"
          placeholder="Near San Jose, CA"
          className="w-full text-[15px] bg-transparent outline-none placeholder:text-muted-2"
        />
      </div>
      <button
        type="submit"
        className="px-6 rounded-[10px] text-[15px] font-semibold bg-sage text-[#FBF6EC] hover:bg-sage-dark transition-colors shrink-0"
      >
        Search
      </button>
    </form>
  );
}
