
import FadeIn from '@/components/animations/FadeIn';
import DashboardStats from './DashboardStats';
import ReservationChart from './ReservationChart';
import CheckInList from './CheckInList';
import ActivityTable from './ActivityTable';

const DashboardContent = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-950">
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">ダッシュボード</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">StayFlow の統計情報と最新アクティビティをご覧いただけます</p>
        </div>

        <DashboardStats />

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ReservationChart />
          <CheckInList />
        </div>

        <ActivityTable />
      </FadeIn>
    </main>
  );
};

export default DashboardContent;
