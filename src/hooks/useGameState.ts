import { useReducer, useEffect } from "react";
import { loadState, saveState } from "../utils/storage";
import mealsData from "../data/meals.json";
import { pickRandom } from "../utils/random";
import countries from "../data/countries";

export interface CompletedCountry {
  countryId: string;
  completedAt: string;
  mealCooked?: string;
}

export interface AppState {
  completedCountries: CompletedCountry[];
  currentCountry: string | null;
  currentMeals: string[];
}

type Action =
  | { type: "SET_CURRENT_COUNTRY"; countryId: string }
  | { type: "MARK_COMPLETED"; countryId: string; mealCooked?: string }
  | { type: "IMPORT_STATE"; state: AppState };

const initialState: AppState = {
  completedCountries: [],
  currentCountry: null,
  currentMeals: [],
};

function getMealsForCountry(countryId: string): string[] {
  const meals = mealsData as Record<string, string[]>;
  return meals[countryId] ?? ["Try a traditional local dish", "Explore street food", "Cook a regional specialty"];
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_CURRENT_COUNTRY": {
      return {
        ...state,
        currentCountry: action.countryId,
        currentMeals: getMealsForCountry(action.countryId),
      };
    }
    case "MARK_COMPLETED": {
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
      };
    }
    case "IMPORT_STATE": {
      return action.state;
    }
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    return loadState() ?? initialState;
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  function randomizeCountry() {
    const completedIds = new Set(state.completedCountries.map((c) => c.countryId));
    const remaining = countries.filter((c) => !completedIds.has(c.id));
    if (remaining.length === 0) return;
    const picked = pickRandom(remaining);
    dispatch({ type: "SET_CURRENT_COUNTRY", countryId: picked.id });
  }

  function markCompleted(countryId: string, mealCooked?: string) {
    dispatch({ type: "MARK_COMPLETED", countryId, mealCooked });
  }

  function importState(newState: AppState) {
    dispatch({ type: "IMPORT_STATE", state: newState });
  }

  return { state, randomizeCountry, markCompleted, importState };
}
