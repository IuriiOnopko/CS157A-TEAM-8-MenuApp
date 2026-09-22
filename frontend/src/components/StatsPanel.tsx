import React, { useEffect, useState } from "react";
import { getRestaurantCount } from "../api/restaurants";

/**
 * The "restaurants served" counter and the two stat tiles below it.
 *
 * These are placeholders on purpose — no hardcoded numbers here. They show
 * "—" until the real values come back from the database
 * (Client -> Tomcat/Java -> MySQL, per the proposal's System Structure
 * diagram). getRestaurantCount() currently resolves to 0 as a stub (see
 * src/api/restaurants.ts / src/data/mockRestaurants.ts) — swap in the real
 * queries there and this will display live.
 */
export default function StatsPanel() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    getRestaurantCount().then((value) => {
      if (!cancelled) setCount(value);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const displayCount = count === null || count === 0 ? "—" : count.toLocaleString();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="bg-ink rounded-[20px] px-7 py-7 flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold tracking-wide uppercase text-[#9CB89A]">
          Restaurants served
        </span>
        <span className="font-display text-[46px] font-semibold tracking-tight text-[#FBF6EC] leading-none">
          {displayCount}
        </span>
        <span className="flex items-center gap-1.5 text-[13px] text-[#B7BFAE]">
          <span className="w-2 h-2 rounded-full bg-[#3BAA6A] live-dot" />
          Updated live from our database with every search
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {/* TODO(backend): replace "—" with a real count once the DB is wired up. */}
        <div className="bg-card border border-border rounded-2xl px-5 py-4 flex flex-col gap-0.5">
          <span className="font-display text-[22px] font-semibold text-ink">
            —
          </span>
          <span className="text-[12.5px] text-muted-2">Cities covered</span>
        </div>
        {/* TODO(backend): replace "—" with a real count once the DB is wired up. */}
        <div className="bg-card border border-border rounded-2xl px-5 py-4 flex flex-col gap-0.5">
          <span className="font-display text-[22px] font-semibold text-ink">
            —
          </span>
          <span className="text-[12.5px] text-muted-2">Menu items indexed</span>
        </div>
      </div>
    </div>
  );
}
