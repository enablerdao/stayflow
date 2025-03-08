
import { cn } from '@/lib/utils';

const DashboardStats = () => {
  const stats = [
    { title: '宿泊数', value: '128', change: '+12.5%', up: true },
    { title: '予約数', value: '54', change: '+7.2%', up: true },
    { title: '客室稼働率', value: '87%', change: '+3.1%', up: true },
    { title: '平均顧客満足度', value: '4.8', change: '-0.2%', up: false },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="rounded-lg border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <span
              className={cn(
                'flex items-center text-xs font-medium',
                stat.up ? 'text-green-600' : 'text-red-600'
              )}
            >
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
