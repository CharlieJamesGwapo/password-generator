export function saveHistory(password: string): void {
  if (typeof window === "undefined") return;
  try {
    const history = JSON.parse(localStorage.getItem("password-history") || "[]") as string[];
    history.unshift(password);
    localStorage.setItem("password-history", JSON.stringify(history.slice(0, 10)));
  } catch {
    console.error("Failed to save history");
  }
}

export function getHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("password-history") || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("password-history");
  } catch {
    console.error("Failed to clear history");
  }
}
