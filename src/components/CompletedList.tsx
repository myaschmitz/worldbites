import type { CompletedCountry } from "../hooks/useGameState";
import countries from "../data/countries";

interface CompletedListProps {
  completedCountries: CompletedCountry[];
}

export default function CompletedList({ completedCountries }: CompletedListProps) {
  if (completedCountries.length === 0) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-center text-slate-400">
        <p>No countries completed yet.</p>
        <p className="mt-1 text-sm">Start cooking to fill this list!</p>
      </div>
    );
  }

  const sorted = [...completedCountries].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800">
      <div className="border-b border-slate-700 px-4 py-3">
        <h2 className="font-semibold text-white">Completed Countries</h2>
      </div>
      <ul className="divide-y divide-slate-700">
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
              <span className="text-xs text-slate-500">{date}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
