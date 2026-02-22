interface RandomizeButtonProps {
  onRandomize: () => void;
  disabled?: boolean;
}

export default function RandomizeButton({ onRandomize, disabled = false }: RandomizeButtonProps) {
  return (
    <button
      onClick={onRandomize}
      disabled={disabled}
      className="w-full rounded-xl bg-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-indigo-500 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Pick a Country
    </button>
  );
}
