import countries from "../data/countries";

interface ProgressStatsProps {
  completedCount: number;
}

export default function ProgressStats({ completedCount }: ProgressStatsProps) {
  const total = countries.length;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-bold text-white">
          {completedCount}
          <span className="text-slate-400">/{total}</span>
        </span>
        <span className="text-sm text-slate-400">{percentage}% complete</span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-400">countries explored</p>
    </div>
  );
}
