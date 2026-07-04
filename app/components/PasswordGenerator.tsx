"use client";
import { useState, useEffect } from "react";
import { generatePassword, checkStrength } from "@/app/lib/passwordUtils";
import { saveHistory, getHistory } from "@/app/lib/storage";
import { StrengthMeter } from "./StrengthMeter";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleGenerate = () => {
    const newPassword = generatePassword(length, options);
    setPassword(newPassword);
    saveHistory(newPassword);
    setHistory(getHistory());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { strength, score } = password ? checkStrength(password) : { strength: "weak" as const, score: 0 };

  return (
    <div className="space-y-6">
      {/* Generator */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Generate a password..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
          />
          <button
            onClick={handleCopy}
            disabled={!password}
            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg font-semibold"
          >
            {copied ? "✓" : "Copy"}
          </button>
        </div>

        {password && <StrengthMeter strength={strength} score={score} />}

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Length: {length}
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "uppercase", label: "Uppercase (A-Z)" },
              { key: "lowercase", label: "Lowercase (a-z)" },
              { key: "numbers", label: "Numbers (0-9)" },
              { key: "symbols", label: "Symbols (!@#...)" },
            ].map((opt) => (
              <label key={opt.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options[opt.key as keyof typeof options]}
                  onChange={(e) => setOptions({ ...options, [opt.key]: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
          >
            Generate Password
          </button>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">History</h2>
          <div className="space-y-2">
            {history.map((pwd, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <code className="text-sm font-mono text-gray-700 dark:text-gray-300">{pwd}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(pwd);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
