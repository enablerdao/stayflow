
import { useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Calendar, ArrowLeft, ArrowRight, Plus, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import ReservationCalendar from './ReservationCalendar';
import ReservationList from './ReservationList';

const ReservationsContent = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(prev);
  };

  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const currentMonthName = months[currentMonth.getMonth()];
  const currentYear = currentMonth.getFullYear();

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-950">
      <FadeIn>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            予約管理 <span className="text-lg font-normal text-gray-500 dark:text-gray-400">/ Reservation Management</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            StayFlow で予約の管理、確認、作成を簡単に行えます
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              onClick={() => setViewMode('calendar')}
              className="flex-1 sm:flex-none"
            >
              <Calendar className="mr-2 h-4 w-4" />
              カレンダー
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className="flex-1 sm:flex-none"
            >
              <Filter className="mr-2 h-4 w-4" />
              リスト
            </Button>
          </div>
          
          <div className="w-full sm:w-auto flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="予約を検索..."
                className="w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            新規予約
          </Button>
        </div>

        {viewMode === 'calendar' && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b dark:border-slate-800">
              <Button variant="ghost" size="sm" onClick={prevMonth}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-medium">
                {currentYear}年{currentMonthName}
              </h2>
              <Button variant="ghost" size="sm" onClick={nextMonth}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <ReservationCalendar currentMonth={currentMonth} />
          </div>
        )}

        {viewMode === 'list' && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow">
            <ReservationList searchQuery={searchQuery} />
          </div>
        )}
      </FadeIn>
    </main>
  );
};

export default ReservationsContent;
