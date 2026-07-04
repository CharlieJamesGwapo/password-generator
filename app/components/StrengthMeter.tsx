"use client";
export function StrengthMeter({ strength, score }: { strength: "weak" | "fair" | "good" | "strong"; score: number }) {
  const colors = { weak: "bg-red-500", fair: "bg-yellow-500", good: "bg-blue-500", strong: "bg-green-500" };
  const labels = { weak: "Weak", fair: "Fair", good: "Good", strong: "Strong" };
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Strength</span>
        <span className={`text-sm font-bold ${colors[strength].replace("bg-", "text-")}`}>{labels[strength]}</span>
      </div>
      <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
        <div className={`h-2 rounded-full transition-all ${colors[strength]}`} style={{ width: `${(score / 6) * 100}%` }} />
      </div>
    </div>
  );
}
