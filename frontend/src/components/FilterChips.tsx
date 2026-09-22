import React, { useState } from "react";

const DEFAULT_CHIPS = [
  "All cuisines",
  "Vegetarian",
  "Under $15",
  "Open now",
  "Gluten-free",
];

/**
 * Quick filter chips shown under the hero search bar.
 *
 * TODO(backend): wire the active chip(s) into the params passed to
 * searchRestaurants() in src/api/restaurants.ts once real filtering
 * (cuisine, price, dietary classification, open-now) is supported server-side.
 */
export default function FilterChips() {
  const [active, setActive] = useState(DEFAULT_CHIPS[0]);

  return (
    <div className="flex gap-2.5 flex-wrap mt-1">
      {DEFAULT_CHIPS.map((chip) => {
        const isActive = chip === active;
        return (
          <button
            key={chip}
            type="button"
            onClick={() => setActive(chip)}
            className={`text-sm font-medium px-3.5 py-1.5 rounded-full border-[1.5px] transition-colors whitespace-nowrap ${
              isActive
                ? "bg-sage border-sage text-[#FBF6EC]"
                : "bg-card border-border-strong text-muted hover:border-sage hover:text-sage"
            }`}
          >
            {chip}
          </button>
        );
      })}
    </div>
  );
}
