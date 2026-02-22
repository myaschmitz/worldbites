import { useReducer, useEffect } from "react";
import type { AppState, CompletedCountry } from "../types";
import { loadState, saveState } from "../utils/storage";
import mealsData from "../data/meals.json";
import { pickRandom } from "../utils/random";
import countries from "../data/countries";

export type { AppState, CompletedCountry };

type Action =
  | { type: "SELECT_RANDOM"; countryId: string; meals: string[] }
  | { type: "MARK_COMPLETE"; countryId: string; mealCooked?: string }
  | { type: "RESET" }
  | { type: "LOAD"; payload: AppState };

const initialState: AppState = {
  completedCountries: [],
  currentCountry: null,
  currentMeals: [],
};

function getMealsForCountry(countryId: string): string[] {
  const all = (mealsData as Record<string, string[]>)[countryId]
    ?? ["Try a traditional local dish", "Explore street food", "Cook a regional specialty"];
  // Shuffle and return 3
  const shuffled = [...all].sort(() => {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return (arr[0] % 3) - 1;
  });
  return shuffled.slice(0, 3);
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SELECT_RANDOM":
      return {
        ...state,
        currentCountry: action.countryId,
        currentMeals: action.meals,
      };
    case "MARK_COMPLETE": {
      const alreadyDone = state.completedCountries.some(
        (c) => c.countryId === action.countryId
      );
      if (alreadyDone) return state;
      const entry: CompletedCountry = {
        countryId: action.countryId,
        completedAt: new Date().toISOString(),
        mealCooked: action.mealCooked,
      };
      return {
        ...state,
        completedCountries: [...state.completedCountries, entry],
        currentCountry: null,
        currentMeals: [],
      };
    }
    case "RESET":
      return initialState;
    case "LOAD":
      return action.payload;
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    return loadState() ?? initialState;
  });

  // Persist on every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  function selectRandom() {
    const completedIds = new Set(state.completedCountries.map((c) => c.countryId));
    const remaining = countries.filter((c) => !completedIds.has(c.id));
    if (remaining.length === 0) return;
    const picked = pickRandom(remaining);
    dispatch({
      type: "SELECT_RANDOM",
      countryId: picked.id,
      meals: getMealsForCountry(picked.id),
    });
  }

  function markComplete(countryId: string, mealCooked?: string) {
    dispatch({ type: "MARK_COMPLETE", countryId, mealCooked });
  }

  function loadSavedState(newState: AppState) {
    dispatch({ type: "LOAD", payload: newState });
  }

  function resetProgress() {
    dispatch({ type: "RESET" });
  }

  return { state, selectRandom, markComplete, loadSavedState, resetProgress };
}
