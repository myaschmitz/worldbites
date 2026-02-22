interface RandomizeButtonProps {
  onRandomize: () => void;
  hasActiveCountry: boolean;
}

export default function RandomizeButton({ onRandomize, hasActiveCountry }: RandomizeButtonProps) {
  return (
    <button
      onClick={onRandomize}
      disabled={hasActiveCountry}
      title={hasActiveCountry ? "Complete or skip the current country first" : "Pick a random country"}
      className="w-full rounded-xl bg-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-indigo-500 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
    >
      Pick a Country
    </button>
  );
}
