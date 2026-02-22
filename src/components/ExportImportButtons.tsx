import { useRef } from "react";
import type { AppState } from "../types";
import { exportToJson, importFromJson } from "../utils/exportImport";

interface ExportImportButtonsProps {
  state: AppState;
  onImport: (state: AppState) => void;
}

export default function ExportImportButtons({ state, onImport }: ExportImportButtonsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const confirmed = window.confirm(
      "Restoring a backup will overwrite your current progress. Continue?"
    );
    if (!confirmed) return;

    importFromJson(file)
      .then(onImport)
      .catch((err: Error) => alert(`Import failed: ${err.message}`));
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => exportToJson(state)}
        className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors"
      >
        Download Progress
      </button>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors"
      >
        Restore Progress
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        aria-label="Restore progress from backup file"
        className="hidden"
        onChange={handleImport}
      />
    </div>
  );
}
