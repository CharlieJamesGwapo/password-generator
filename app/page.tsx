import { PasswordGenerator } from "./components/PasswordGenerator";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Password Generator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Generate strong, secure passwords with customizable options</p>
        <PasswordGenerator />
      </div>
    </main>
  );
}
