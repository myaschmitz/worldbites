interface WorldMapProps {
  completedIds: Set<string>;
  currentCountryId: string | null;
  onCountryClick: (countryId: string) => void;
}

export default function WorldMap({ completedIds, currentCountryId, onCountryClick }: WorldMapProps) {
  // Placeholder — replace with react-simple-maps or similar SVG map library
  return (
    <div className="w-full rounded-xl bg-blue-950 p-4 text-center text-slate-400">
      <p className="text-sm">Interactive map coming soon</p>
      <p className="text-xs mt-1">
        {completedIds.size} countries completed
        {currentCountryId && ` · Current: ${currentCountryId}`}
      </p>
      <button
        className="mt-2 text-xs underline"
        onClick={() => currentCountryId && onCountryClick(currentCountryId)}
      >
        Select current country
      </button>
    </div>
  );
}
