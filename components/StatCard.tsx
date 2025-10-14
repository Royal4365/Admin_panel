import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800/70 dark:backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">
            {value}
          </p>
          {trend && (
            <p
              className={`text-sm mt-2 font-medium ${
                trendUp
                  ? "text-green-600 dark:text-green-500"
                  : "text-red-600 dark:text-red-500"
              }`}
            >
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl transition-all duration-300">
          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-500" />
        </div>
      </div>
    </div>
  );
}
