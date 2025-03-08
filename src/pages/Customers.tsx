
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useLanguage } from '@/hooks/use-language';
import CustomersContent from '@/components/customers/CustomersContent';
import FadeIn from '@/components/animations/FadeIn';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';

const Customers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-background">
      {/* サイドバー - デスクトップ用 (lg以上の画面サイズでのみ表示) */}
      <div className="hidden lg:block">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* モバイルメニューのオーバーレイ - モバイル時のみ表示 */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={closeMobileMenu}
        >
          {/* モバイルメニューの中身 */}
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 z-[100] overflow-y-auto transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex justify-between items-center h-16 px-4 border-b dark:border-slate-800">
              <h2 className="text-lg font-semibold">{t('メニュー', 'Menu')}</h2>
              <button 
                onClick={closeMobileMenu}
                className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
                aria-label={t('閉じる', 'Close')}
              >
                <Info className="h-5 w-5" />
              </button>
            </div>
            <FadeIn direction="left" duration={400} delay={150}>
              <Sidebar sidebarOpen={true} toggleSidebar={toggleSidebar} mobileView={true} />
            </FadeIn>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header toggleMobileMenu={toggleMobileMenu} toggleSidebar={toggleSidebar} />

        {/* デモモード通知 */}
        <FadeIn direction="up" duration={500} delay={300}>
          <div className="px-4 py-2">
            <Alert variant="default" className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
              <Info className="h-4 w-4 text-amber-500 mr-2" />
              <AlertDescription className="text-amber-800 dark:text-amber-300">
                {t('これはデモモードです。すべての機能を利用するにはログインしてください。', 
                   'This is demo mode. Please login to use all features.')}
              </AlertDescription>
            </Alert>
          </div>
        </FadeIn>

        <CustomersContent />
      </div>
    </div>
  );
};

export default Customers;
