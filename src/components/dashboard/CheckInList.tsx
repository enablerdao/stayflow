
import { useCheckInData } from '@/hooks/use-checkin-data';

const CheckInList = () => {
  const { checkIns } = useCheckInData();

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">今日のチェックイン</h3>
      <div className="mt-4 space-y-3">
        {checkIns.map((guest, i) => (
          <div key={i} className="flex items-center justify-between border-b pb-2 dark:border-slate-700">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{guest.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Room {guest.room}</p>
            </div>
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-slate-800 dark:text-gray-300">
              {guest.time}
            </span>
          </div>
        ))}
        <a
          href="#"
          className="block text-center text-sm font-medium text-primary hover:text-primary/90"
        >
          すべてのチェックインを表示
        </a>
      </div>
    </div>
  );
};

export default CheckInList;
