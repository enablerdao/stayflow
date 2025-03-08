import { useState, useEffect } from 'react';
import { ChevronLeft, Home, User, Calendar, BarChart2, Settings, Menu, X, Bell, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import FadeIn from '@/components/animations/FadeIn';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [userName, setUserName] = useState('ゲスト');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedDashboard');
    if (hasVisitedBefore) {
      setFirstVisit(false);
    } else {
      localStorage.setItem('hasVisitedDashboard', 'true');
      
      const timer = setTimeout(() => {
        setFirstVisit(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissWelcomeScreen = () => {
    setFirstVisit(false);
  };

  return (
    <div className="flex h-screen bg-background">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 h-full w-64 bg-white shadow-md transition-all duration-300 lg:static dark:bg-slate-900',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-20'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className={cn('transition-all duration-300', !sidebarOpen && 'lg:opacity-0')}>
            <Logo size="sm" />
          </div>
          <button
            onClick={toggleSidebar}
            className="hidden rounded-md p-1.5 text-gray-400 hover:bg-gray-100 lg:block dark:hover:bg-slate-800"
          >
            <ChevronLeft
              className={cn('h-5 w-5 transition-transform duration-300', !sidebarOpen && 'rotate-180')}
            />
          </button>
        </div>
        <nav className="mt-6 space-y-1 px-2">
          {[
            { name: 'ホーム', icon: Home, href: '#' },
            { name: 'お客様管理', icon: User, href: '#' },
            { name: '予約管理', icon: Calendar, href: '#' },
            { name: '分析', icon: BarChart2, href: '#' },
            { name: '設定', icon: Settings, href: '#' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-primary/10 hover:text-primary',
                !sidebarOpen && 'lg:justify-center'
              )}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0 lg:mr-0" />
              <span className={cn('transition-opacity duration-300', !sidebarOpen && 'lg:hidden')}>
                {item.name}
              </span>
            </a>
          ))}
        </nav>
      </aside>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden" 
          onClick={toggleMobileMenu}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="bg-white shadow dark:bg-slate-900">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden dark:hover:bg-slate-800"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">ダッシュボード</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="検索..."
                  className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button className="rounded-full bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700">
                <Bell className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 overflow-hidden rounded-full bg-primary">
                <img
                  src="https://source.unsplash.com/random/100x100/?portrait"
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {firstVisit && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <FadeIn 
              direction="up" 
              className="max-w-3xl rounded-lg bg-white p-8 shadow-2xl dark:bg-slate-800"
            >
              <h2 className="mb-6 text-3xl font-bold text-primary">ようこそ、{userName}さん</h2>
              <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                スティフローダッシュボードへようこそ。ここから全ての管理機能にアクセスできます。
              </p>
              
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-slate-900">
                  <Calendar className="mx-auto mb-2 h-10 w-10 text-primary" />
                  <h3 className="font-medium">予約管理</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">本日の予約: 3件</p>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-slate-900">
                  <User className="mx-auto mb-2 h-10 w-10 text-primary" />
                  <h3 className="font-medium">お客様管理</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">新規お客様: 5名</p>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-slate-900">
                  <BarChart2 className="mx-auto mb-2 h-10 w-10 text-primary" />
                  <h3 className="font-medium">売上分析</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">前月比: +12%</p>
                </div>
              </div>
              
              <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <h3 className="mb-2 font-medium text-blue-800 dark:text-blue-300">クイックスタート</h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  左側のサイドバーから各機能にアクセスできます。まずは本日の予約を確認してみましょう。
                </p>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={dismissWelcomeScreen}
                  className="rounded-md bg-primary px-6 py-2 text-white transition-colors hover:bg-primary/90"
                >
                  ダッシュボードを表示
                </button>
              </div>
            </FadeIn>
          </div>
        )}

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-950">
          <FadeIn>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: '宿泊数', value: '128', change: '+12.5%', up: true },
                { title: '予約数', value: '54', change: '+7.2%', up: true },
                { title: '客室稼働率', value: '87%', change: '+3.1%', up: true },
                { title: '平均顧客満足度', value: '4.8', change: '-0.2%', up: false },
              ].map((stat, i) => (
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

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
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

              <div className="rounded-lg border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">今日のチェックイン</h3>
                <div className="mt-4 space-y-3">
                  {[
                    { name: '佐藤 健太', time: '14:00', room: '203' },
                    { name: '山田 優子', time: '15:30', room: '101' },
                    { name: '鈴木 康介', time: '16:45', room: '304' },
                  ].map((guest, i) => (
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
            </div>

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
                    {[
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
                    ].map((item, i) => (
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
          </FadeIn>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
