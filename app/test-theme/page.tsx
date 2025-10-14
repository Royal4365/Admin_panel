"use client";

import { useTheme } from "@/lib/theme-context";

export default function TestThemePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Theme Test Page
      </h1>

      <div className="space-y-4">
        <p className="text-slate-600 dark:text-slate-400">
          Current theme: <strong>{theme}</strong>
        </p>

        <button
          onClick={() => {
            console.log("Button clicked!");
            toggleTheme();
          }}
          className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          Toggle Theme
        </button>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              Card 1
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              This should change color
            </p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              Card 2
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              This should also change
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg">
          <h4 className="font-bold text-yellow-900 dark:text-yellow-100">
            Debug Info
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
            <li>Theme state: {theme}</li>
            <li>
              HTML class:{" "}
              {typeof document !== "undefined"
                ? document.documentElement.className
                : "N/A"}
            </li>
            <li>
              localStorage theme:{" "}
              {typeof localStorage !== "undefined"
                ? localStorage.getItem("theme")
                : "N/A"}
            </li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Open DevTools Console (F12) and click the button above. You should
            see logs.
          </p>
        </div>
      </div>
    </div>
  );
}
