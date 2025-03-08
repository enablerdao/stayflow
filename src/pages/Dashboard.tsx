
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import WelcomeScreen from '@/components/dashboard/WelcomeScreen';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open on larger screens
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [userName, setUserName] = useState('ゲスト');
  const { toast } = useToast();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

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
      {/* サイドバー - デスクトップ用 (lg以上の画面サイズでのみ表示) */}
      <div className="hidden lg:block">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* モバイルメニューのオーバーレイ - モバイル時のみ表示 */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/50 lg:hidden" 
          onClick={closeMobileMenu}
        >
          {/* モバイルメニューの中身 */}
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 z-[100] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center h-16 px-4 border-b dark:border-slate-800">
              <h2 className="text-lg font-semibold">メニュー</h2>
              <button 
                onClick={closeMobileMenu}
                className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800"
                aria-label="閉じる"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Sidebar sidebarOpen={true} toggleSidebar={toggleSidebar} mobileView={true} />
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
