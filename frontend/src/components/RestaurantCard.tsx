import React from "react";
import { Restaurant } from "../types/restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect?: (restaurant: Restaurant) => void;
}

export default function RestaurantCard({
  restaurant,
  onSelect,
}: RestaurantCardProps) {
  const isOpen = restaurant.status === "Open";

  return (
    <button
      type="button"
      onClick={() => onSelect?.(restaurant)}
      className="w-full text-left bg-card border border-border rounded-2xl p-4 flex items-center gap-3.5 transition-all hover:shadow-[0_8px_24px_rgba(27,33,26,0.08)] hover:-translate-y-0.5"
    >
      <div
        className="w-14 h-14 rounded-xl shrink-0"
        style={{ backgroundColor: restaurant.swatchColor }}
        aria-hidden="true"
      />
      <div className="flex-grow min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[15.5px] font-semibold text-ink truncate">
            {restaurant.name}
          </span>
          <span
            className={`text-[11.5px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
              isOpen
                ? "bg-[#E4EFDF] text-sage"
                : "bg-[#F3E6DA] text-[#9A5A3A]"
            }`}
          >
            {restaurant.status}
          </span>
        </div>
        <span className="text-[13px] text-muted-2 truncate">
          {restaurant.cuisine} · {restaurant.priceLevel} ·{" "}
          {/* TODO(backend): distanceMiles is a placeholder (0) until real geolocation/DB data is wired up. */}
          {restaurant.distanceMiles > 0 ? `${restaurant.distanceMiles} mi` : "—"}
        </span>
      </div>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M9 6l6 6-6 6"
          stroke="#B7BFAE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
