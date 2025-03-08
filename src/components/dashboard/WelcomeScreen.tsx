
import { Calendar, User, BarChart2 } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

interface WelcomeScreenProps {
  userName: string;
  dismissWelcomeScreen: () => void;
}

const WelcomeScreen = ({ userName, dismissWelcomeScreen }: WelcomeScreenProps) => {
  return (
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
  );
};

export default WelcomeScreen;
