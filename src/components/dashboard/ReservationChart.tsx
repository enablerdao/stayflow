
import { BarChart2 } from 'lucide-react';

const ReservationChart = () => {
  return (
    <div className="col-span-2 rounded-lg border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">月間予約状況</h3>
      <div className="mt-4 h-64 w-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-full w-full rounded bg-gray-100 dark:bg-slate-800">
            <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
              <BarChart2 className="h-16 w-16 text-gray-300 dark:text-gray-700" />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                予約チャートはこちらに表示されます
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationChart;
