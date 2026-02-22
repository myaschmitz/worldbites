import countries from "../data/countries";

interface CountryCardProps {
  countryId: string | null;
  meals: string[];
  onMarkCompleted: (mealCooked?: string) => void;
}

export default function CountryCard({ countryId, meals, onMarkCompleted }: CountryCardProps) {
  if (!countryId) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-center text-slate-400">
        <p>Press "Pick a Country" to get started!</p>
      </div>
    );
  }

  const country = countries.find((c) => c.id === countryId);

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

      <button
        onClick={() => onMarkCompleted()}
        className="mt-6 w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500 transition-colors"
      >
        Mark as Completed
      </button>
    </div>
  );
}
