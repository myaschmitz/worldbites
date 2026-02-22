import { useState } from "react";
import type { CompletedCountry } from "../types";
import countries from "../data/countries";

type SortOrder = "date-desc" | "date-asc" | "alpha";

interface CompletedListProps {
  completedCountries: CompletedCountry[];
}

export default function CompletedList({ completedCountries }: CompletedListProps) {
  const [sort, setSort] = useState<SortOrder>("date-desc");

  if (completedCountries.length === 0) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-center text-slate-400">
        <p>No countries completed yet.</p>
        <p className="mt-1 text-sm">Start cooking to fill this list!</p>
      </div>
    );
  }

  const sorted = [...completedCountries].sort((a, b) => {
    if (sort === "date-desc") return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
    if (sort === "date-asc") return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
    const nameA = countries.find((c) => c.id === a.countryId)?.name ?? a.countryId;
    const nameB = countries.find((c) => c.id === b.countryId)?.name ?? b.countryId;
    return nameA.localeCompare(nameB);
  });

  const sortBtn = (label: string, value: SortOrder) => (
    <button
      type="button"
      onClick={() => setSort(value)}
      className={`rounded px-2 py-0.5 text-xs transition-colors ${
        sort === value
          ? "bg-indigo-600 text-white"
          : "text-slate-400 hover:text-slate-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800">
      <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
        <h2 className="font-semibold text-white">
          Completed Countries <span className="ml-1 text-sm text-slate-400">({completedCountries.length})</span>
        </h2>
        <div className="flex gap-1">
          {sortBtn("Newest", "date-desc")}
          {sortBtn("Oldest", "date-asc")}
          {sortBtn("A–Z", "alpha")}
        </div>
      </div>
      <ul className="max-h-96 divide-y divide-slate-700 overflow-y-auto">
        {sorted.map((entry) => {
          const country = countries.find((c) => c.id === entry.countryId);
          const date = new Date(entry.completedAt).toLocaleDateString();
          return (
            <li key={entry.countryId} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium text-white">{country?.name ?? entry.countryId}</p>
                {entry.mealCooked && (
                  <p className="text-xs text-slate-400">{entry.mealCooked}</p>
                )}
              </div>
              <span className="ml-4 shrink-0 text-xs text-slate-500">{date}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
