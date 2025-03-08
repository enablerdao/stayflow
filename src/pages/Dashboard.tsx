
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import WelcomeScreen from '@/components/dashboard/WelcomeScreen';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to closed
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [userName, setUserName] = useState('ゲスト');
  const { toast } = useToast();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    // デバッグ中は毎回ウェルカム画面を表示する
    setFirstVisit(true);
    
    // 以前のローカルストレージのロジックをコメントアウト
    /*
    const hasVisitedBefore = localStorage.getItem('hasVisitedDashboard');
    
    // デバッグ用コンソールログ
    console.log("Has visited before:", hasVisitedBefore);
    
    if (!hasVisitedBefore) {
      setFirstVisit(true);
      localStorage.setItem('hasVisitedDashboard', 'true');
    } else {
      setFirstVisit(false);
    }
    */
  }, []);

  const dismissWelcomeScreen = () => {
    setFirstVisit(false);
    toast({
      title: "ようこそ！",
      description: "ダッシュボードをご利用いただきありがとうございます。",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* サイドバー */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* モバイルメニューのオーバーレイ */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 lg:hidden" 
          onClick={toggleMobileMenu}
        >
          {/* モバイルメニューの中身 */}
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">メニュー</h2>
              <button 
                onClick={toggleMobileMenu}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="space-y-4">
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md">ホーム</a>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md">お客様管理</a>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md">予約管理</a>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md">分析</a>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md">設定</a>
            </nav>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header toggleMobileMenu={toggleMobileMenu} toggleSidebar={toggleSidebar} />

        {firstVisit && (
          <WelcomeScreen userName={userName} dismissWelcomeScreen={dismissWelcomeScreen} />
        )}

        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
