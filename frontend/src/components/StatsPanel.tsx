import React, { useEffect, useState } from "react";
import { getRestaurantCount } from "../api/restaurants";

/**
 * The in-network restaurant counter — the only live number on the home page.
 *
 * The value comes straight from MySQL (Client -> Tomcat/Java -> MySQL, per
 * the proposal's System Structure diagram), so this card doubles as the
 * sprint 1 proof that the full stack is connected. If the request fails we
 * show "—" and say so, rather than faking a number.
 */
export default function StatsPanel() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getRestaurantCount()
      .then((value) => {
        if (!cancelled) setCount(value);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const animated = useCountUp(count ?? 0, 2400);
  const displayCount = count === null ? "—" : animated.toLocaleString();

  return (
    <div className="bg-ink rounded-[20px] px-7 py-8 flex flex-col gap-2 w-full">
      <span className="text-[13px] font-semibold tracking-wide uppercase text-[#9CB89A]">
        Restaurants in our network
      </span>
      <span className="font-display text-[56px] font-semibold tracking-tight text-[#FBF6EC] leading-none tabular-nums">
        {displayCount}
      </span>
      <span className="flex items-center gap-1.5 text-[13px] text-[#B7BFAE]">
        {error ? (
          <>
            <span className="w-2 h-2 rounded-full bg-[#C2410C]" />
            Couldn't reach the database right now
          </>
        ) : count === null ? (
          <>
            <span className="w-2 h-2 rounded-full bg-[#6B7566]" />
            Connecting to the database…
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-[#3BAA6A] live-dot" />
            Local businesses that trust MenuMap with their menus
          </>
        )}
      </span>
    </div>
  );
}

/**
 * Animates from 0 up to `target`, fast at first and slowing down as it
 * approaches the final value (ease-out). Jumps straight to the value for
 * users who prefer reduced motion.
 */
function useCountUp(target: number, durationMs: number): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (target === 0 || reduceMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return value;
}
