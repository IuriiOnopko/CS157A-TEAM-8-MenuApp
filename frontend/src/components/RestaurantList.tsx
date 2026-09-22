import React from "react";
import { Restaurant } from "../types/restaurant";
import RestaurantCard from "./RestaurantCard";

interface RestaurantListProps {
  restaurants: Restaurant[];
  layout: "sidebar" | "grid";
  onSelect?: (restaurant: Restaurant) => void;
}

export default function RestaurantList({
  restaurants,
  layout,
  onSelect,
}: RestaurantListProps) {
  if (restaurants.length === 0) {
    // TODO(backend): this is the expected state until GET /api/restaurants
    // (Tomcat/Java -> MySQL, per the proposal) is wired up in
    // src/api/restaurants.ts — there's no placeholder data to fall back to.
    return (
      <div className="text-center py-16 px-6 text-muted-2 text-sm">
        No restaurants to show yet — this list populates once it's connected
        to the database.
      </div>
    );
  }

  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          : "flex flex-col gap-3.5"
      }
    >
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
