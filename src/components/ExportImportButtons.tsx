import { useRef } from "react";
import type { AppState } from "../hooks/useGameState";
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
    importFromJson(file)
      .then(onImport)
      .catch(() => alert("Failed to import: invalid backup file."));
    e.target.value = "";
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => exportToJson(state)}
        className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors"
      >
        Export Backup
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors"
      >
        Import Backup
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImport}
      />
    </div>
  );
}
