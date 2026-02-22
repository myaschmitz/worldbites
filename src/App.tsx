import { useGameState } from "./hooks/useGameState";
import countries from "./data/countries";
import WorldMap from "./components/WorldMap";
import CountryCard from "./components/CountryCard";
import RandomizeButton from "./components/RandomizeButton";
import ProgressStats from "./components/ProgressStats";
import CompletedList from "./components/CompletedList";
import ExportImportButtons from "./components/ExportImportButtons";

export default function App() {
  const { state, selectRandom, markComplete, loadSavedState, resetProgress } = useGameState();

  const currentCountry = countries.find((c) => c.id === state.currentCountry);

  function handleReset() {
    if (window.confirm("Reset all progress? This cannot be undone.")) {
      resetProgress();
    }
  }

  const allDone =
    state.completedCountries.length === countries.length && countries.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="shrink-0">
            <h1 className="text-xl font-bold tracking-tight">WorldBites</h1>
            <p className="text-xs text-slate-400">Cook a meal from every country</p>
          </div>
          <div className="w-48 shrink-0 sm:w-64">
            <ProgressStats completedCount={state.completedCountries.length} />
          </div>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {allDone ? (
          <div className="rounded-xl border border-green-700 bg-green-950 p-8 text-center">
            <p className="text-3xl font-bold text-green-300">You did it!</p>
            <p className="mt-2 text-green-400">
              You've cooked a meal from every country in the world.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 rounded-lg border border-green-700 px-4 py-2 text-sm text-green-300 hover:bg-green-900 transition-colors"
            >
              Start over
            </button>
          </div>
        ) : (
          <>
            {/* Map + Card row */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="min-w-0 flex-1">
                <WorldMap
                  completedCountries={state.completedCountries}
                  currentMapId={currentCountry?.mapId ?? null}
                />
              </div>
              <div className="flex w-full flex-col gap-4 md:w-80 lg:w-96">
                <RandomizeButton
                  onRandomize={selectRandom}
                  hasActiveCountry={!!state.currentCountry}
                />
                <CountryCard
                  countryId={state.currentCountry}
                  meals={state.currentMeals}
                  onMarkComplete={(mealCooked) =>
                    state.currentCountry && markComplete(state.currentCountry, mealCooked)
                  }
                />
              </div>
            </div>

            {/* Completed list */}
            <div className="mt-6">
              <CompletedList completedCountries={state.completedCountries} />
            </div>
          </>
        )}

        {/* Footer actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ExportImportButtons state={state} onImport={loadSavedState} />
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-red-900 px-4 py-2 text-sm text-red-400 hover:bg-red-950 transition-colors"
          >
            Reset Progress
          </button>
        </div>
      </main>
    </div>
  );
}
