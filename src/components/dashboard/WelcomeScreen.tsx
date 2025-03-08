
import { Calendar, User, BarChart2, Settings, BookOpen, HelpCircle, Home } from 'lucide-react';
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
        className="max-w-4xl rounded-lg bg-white p-8 shadow-2xl dark:bg-slate-800"
      >
        <h2 className="mb-6 text-3xl font-bold text-primary">ようこそ、{userName}さん</h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
          スティフローダッシュボードへようこそ。ここから全ての管理機能にアクセスできます。
          まずは物件の登録から始めましょう。
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
        
        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">はじめに</h3>
        
        {/* 物件登録セクション - 新規追加 */}
        <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <div className="mb-2 flex items-center">
            <Home className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-300" />
            <h4 className="font-medium text-blue-800 dark:text-blue-300">物件を登録しましょう</h4>
          </div>
          <p className="mb-3 text-sm text-blue-700 dark:text-blue-200">
            まずは物件情報を登録して、システムを使い始めましょう。物件の詳細情報、写真、設備などを入力できます。
          </p>
          <Link 
            to="/property/register" 
            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            onClick={dismissWelcomeScreen}
          >
            物件を登録する
          </Link>
        </div>
        
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <div className="mb-2 flex items-center">
              <Settings className="mr-2 h-5 w-5 text-green-600 dark:text-green-300" />
              <h4 className="font-medium text-green-800 dark:text-green-300">初期設定</h4>
            </div>
            <p className="text-sm text-green-700 dark:text-green-200">
              まずはプロフィール設定を完了させて、システムをカスタマイズしましょう。
            </p>
          </div>

          <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
            <div className="mb-2 flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-300" />
              <h4 className="font-medium text-purple-800 dark:text-purple-300">ガイド</h4>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-200">
              詳細なユーザーガイドとチュートリアルで、機能の使い方を学びましょう。
            </p>
          </div>
        </div>
        
        <div className="mb-6 rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
          <div className="mb-2 flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-300" />
            <h4 className="font-medium text-amber-800 dark:text-amber-300">サポート</h4>
          </div>
          <p className="text-sm text-amber-700 dark:text-amber-200">
            質問がありましたら、いつでもサポートチームにお問い合わせください。24時間以内に返信いたします。
          </p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button 
            onClick={dismissWelcomeScreen}
            className="rounded-md bg-gray-200 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            後で見る
          </button>
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
