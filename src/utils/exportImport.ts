import type { AppState } from "../types";
import countries from "../data/countries";

const VALID_COUNTRY_IDS = new Set(countries.map((c) => c.id));

export function exportToJson(state: AppState): void {
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `worldbites-progress-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function validateState(data: unknown): data is AppState {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  if (!Array.isArray(d.completedCountries)) return false;
  for (const entry of d.completedCountries as unknown[]) {
    if (!entry || typeof entry !== "object") return false;
    const e = entry as Record<string, unknown>;
    if (typeof e.countryId !== "string") return false;
    if (typeof e.completedAt !== "string") return false;
    if (!VALID_COUNTRY_IDS.has(e.countryId)) return false;
  }
  return true;
}

export function importFromJson(file: File): Promise<AppState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed: unknown = JSON.parse(e.target?.result as string);
        if (!validateState(parsed)) {
          reject(new Error("File does not contain valid WorldBites progress data."));
          return;
        }
        resolve(parsed);
      } catch {
        reject(new Error("Invalid JSON file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
