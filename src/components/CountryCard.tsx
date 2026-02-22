import { useState } from "react";
import countries from "../data/countries";

interface CountryCardProps {
  countryId: string | null;
  meals: string[];
  onMarkComplete: (mealCooked?: string) => void;
}

export default function CountryCard({ countryId, meals, onMarkComplete }: CountryCardProps) {
  const [mealCooked, setMealCooked] = useState("");

  if (!countryId) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-center text-slate-400">
        <p className="text-lg">Press "Pick a Country" to get started!</p>
        <p className="mt-1 text-sm">A random country and meal suggestions will appear here.</p>
      </div>
    );
  }

  const country = countries.find((c) => c.id === countryId);

  function handleSubmit() {
    onMarkComplete(mealCooked.trim() || undefined);
    setMealCooked("");
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
      <div className="mb-4">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {country?.region}
        </span>
        <h2 className="mt-1 text-2xl font-bold text-white">{country?.name}</h2>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Meal Suggestions
        </h3>
        <ul className="space-y-2">
          {meals.map((meal, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-200">
              <span className="mt-0.5 text-green-400">•</span>
              {meal}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <label className="mb-1 block text-sm text-slate-400" htmlFor="meal-cooked">
          What did you cook? <span className="text-slate-500">(optional)</span>
        </label>
        <input
          id="meal-cooked"
          type="text"
          value={mealCooked}
          onChange={(e) => setMealCooked(e.target.value)}
          placeholder="e.g. Beef rendang with jasmine rice"
          className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-500 transition-colors"
      >
        I cooked it!
      </button>
    </div>
  );
}
