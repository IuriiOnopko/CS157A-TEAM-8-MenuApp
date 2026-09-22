import React from "react";

export type ViewMode = "split" | "list" | "map";

interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

/**
 * Split / List / Map segmented control.
 * Satisfies the proposal's "Customers can view participating restaurants
 * in a list or map view" requirement.
 */
export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  const options: { key: ViewMode; label: string }[] = [
    { key: "split", label: "Split" },
    { key: "list", label: "List" },
    { key: "map", label: "Map" },
  ];

  return (
    <div className="flex gap-1 bg-[#EFEBDF] rounded-[11px] p-1">
      {options.map((opt) => {
        const isActive = opt.key === view;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={`text-sm font-semibold px-5 py-2 rounded-[9px] transition-colors ${
              isActive
                ? "bg-white text-ink shadow-[0_1px_3px_rgba(27,33,26,0.12)]"
                : "text-muted-2 hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
