
import { Calendar, User, BarChart2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/animations/FadeIn';

interface WelcomeScreenProps {
  userName: string;
  dismissWelcomeScreen: () => void;
}

const WelcomeScreen = ({ userName, dismissWelcomeScreen }: WelcomeScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <FadeIn 
        direction="up" 
        className="max-w-3xl rounded-lg bg-white p-6 shadow-xl dark:bg-slate-800"
      >
        <h2 className="mb-4 text-2xl font-bold text-primary">ようこそ、{userName}さん</h2>
        <p className="mb-5 text-gray-600 dark:text-gray-300">
          スティフローダッシュボードへようこそ。ここから全ての管理機能にアクセスできます。
        </p>
        
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-slate-900 dark:hover:bg-slate-800">
            <Calendar className="mb-2 h-6 w-6 text-primary" />
            <h3 className="font-medium">予約管理</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">本日の予約: 3件</p>
          </div>
          
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-slate-900 dark:hover:bg-slate-800">
            <User className="mb-2 h-6 w-6 text-primary" />
            <h3 className="font-medium">お客様管理</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">新規お客様: 5名</p>
          </div>
          
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-slate-900 dark:hover:bg-slate-800">
            <BarChart2 className="mb-2 h-6 w-6 text-primary" />
            <h3 className="font-medium">売上分析</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">前月比: +12%</p>
          </div>
        </div>
        
        <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <div className="mb-2 flex items-center">
            <Home className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-300" />
            <h4 className="font-medium text-blue-800 dark:text-blue-300">物件を登録しましょう</h4>
          </div>
          <p className="mb-3 text-sm text-blue-700 dark:text-blue-200">
            まずは物件情報を登録して、システムを使い始めましょう。
          </p>
          <Link 
            to="/property/register" 
            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            onClick={dismissWelcomeScreen}
          >
            物件を登録する
          </Link>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={dismissWelcomeScreen}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            後で見る
          </button>
          <button 
            onClick={dismissWelcomeScreen}
            className="rounded-md bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/90"
          >
            ダッシュボードを表示
          </button>
        </div>
      </FadeIn>
    </div>
  );
};

export default WelcomeScreen;
