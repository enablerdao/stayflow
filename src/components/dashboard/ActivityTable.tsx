
import { cn } from '@/lib/utils';

const ActivityTable = () => {
  const activities = [
    {
      action: '予約が作成されました',
      user: '田中 誠',
      time: '25分前',
      status: '完了',
      statusColor: 'green',
    },
    {
      action: 'ルームサービス リクエスト',
      user: '鈴木 美咲',
      time: '1時間前',
      status: '進行中',
      statusColor: 'yellow',
    },
    {
      action: 'お客様チェックアウト',
      user: '佐々木 隆',
      time: '3時間前',
      status: '完了',
      statusColor: 'green',
    },
    {
      action: '予約がキャンセルされました',
      user: '高橋 直子',
      time: '5時間前',
      status: 'キャンセル',
      statusColor: 'red',
    },
  ];

  return (
    <div className="mt-6 rounded-lg border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">最近のアクティビティ</h3>
        <a href="#" className="text-sm font-medium text-primary hover:text-primary/90">
          すべてを表示
        </a>
      </div>
      <div className="mt-4 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                アクション
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                ユーザー
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                日時
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                ステータス
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
            {activities.map((item, i) => (
              <tr key={i}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.action}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.user}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.time}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                      item.statusColor === 'green'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500'
                        : item.statusColor === 'yellow'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
                    )}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
