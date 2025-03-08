
import FadeIn from '@/components/animations/FadeIn';
import DashboardStats from './DashboardStats';
import ReservationChart from './ReservationChart';
import CheckInList from './CheckInList';
import ActivityTable from './ActivityTable';

const DashboardContent = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-950">
      <FadeIn>
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
