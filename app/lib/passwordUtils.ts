export function generatePassword(length: number, options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean }): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (options.uppercase) chars += uppercase;
  if (options.lowercase) chars += lowercase;
  if (options.numbers) chars += numbers;
  if (options.symbols) chars += symbols;

  if (!chars) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export function checkStrength(password: string): { strength: "weak" | "fair" | "good" | "strong"; score: number } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score++;

  const strength: "weak" | "fair" | "good" | "strong" = score <= 2 ? "weak" : score <= 3 ? "fair" : score <= 4 ? "good" : "strong";
  return { strength, score };
}
