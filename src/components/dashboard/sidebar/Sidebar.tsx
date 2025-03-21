
import { useState } from 'react';
import { ChevronLeft, Home, User, Calendar, BarChart2, Settings, Sun, Moon, MessageSquare, FileText, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from '@/components/language/LanguageSwitcher';
import { useFeedback } from '@/hooks/use-feedback';
import SidebarMenuItem from './SidebarMenuItem';
import SidebarSubmenu from './SidebarSubmenu';
import MobileSidebar from './MobileSidebar';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  mobileView?: boolean;
}

const Sidebar = ({ sidebarOpen, toggleSidebar, mobileView = false }: SidebarProps) => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const location = useLocation();
  const { openFeedback } = useFeedback();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const menuItems = [
    { name: t('ホーム', 'Home'), icon: Home, href: '/dashboard' },
    { name: t('お客様管理', 'Guests'), icon: User, href: '/customers' },
    { name: t('予約管理', 'Reservations'), icon: Calendar, href: '/reservations' },
    { name: t('メッセージ', 'Messages'), icon: MessageSquare, href: '/messages' },
    { name: t('レポート', 'Reports'), icon: FileText, href: '/reports' },
    { name: t('分析', 'Analytics'), icon: BarChart2, href: '/analytics' },
    { name: t('物件管理', 'Properties'), icon: Building, href: '/properties' },
  ];

  const bottomMenuItems = [
    { name: t('設定', 'Settings'), icon: Settings, href: '#' },
    { 
      name: t('フィードバック', 'Feedback'), 
      icon: MessageSquare, 
      onClick: openFeedback,
      href: '#' 
    },
  ];
  
  // Check if a menu item is active based on current path
  const isActive = (href: string) => {
    if (href === '#') return false;
    if (href === '/properties' && location.pathname === '/property/register') return true;
    return location.pathname === href || location.pathname.startsWith(href);
  };
  
  // Use mobile layout for mobile view
  if (mobileView) {
    return (
      <MobileSidebar 
        menuItems={menuItems}
        bottomMenuItems={bottomMenuItems}
        isActive={isActive}
        isSubmenuActive={() => false}
      />
    );
  }
  
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 h-full bg-white shadow-sm transition-all duration-300 ease-in-out lg:static dark:bg-slate-900 dark:border-r dark:border-slate-800',
        sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:w-20 lg:translate-x-0'
      )}
      style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)' }}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b dark:border-slate-800">
        <div className={cn('transition-all duration-300', !sidebarOpen && 'lg:opacity-0')}>
          <Logo size="sm" />
        </div>
        <button
          onClick={toggleSidebar}
          className="hidden rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:block dark:text-gray-300 dark:hover:bg-slate-800 transition-colors duration-200"
          aria-label={t('サイドバーを切り替える', 'Toggle sidebar')}
        >
          <ChevronLeft
            className={cn('h-5 w-5 transition-transform duration-300', !sidebarOpen && 'rotate-180')}
          />
        </button>
      </div>
      
      <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
        <nav className="mt-6 px-3 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              href={item.href}
              isActive={isActive(item.href)}
              sidebarOpen={sidebarOpen}
            />
          ))}
        </nav>
          
        <div className="mb-6 px-3 space-y-1.5">
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              href={item.href}
              isActive={isActive(item.href)}
              sidebarOpen={sidebarOpen}
              onClick={item.onClick}
            />
          ))}
          
          {/* Theme toggle */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className={cn(
              'w-full flex items-center justify-start rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800 transition-all duration-200',
              !sidebarOpen && 'lg:justify-center lg:px-2'
            )}
          >
            {theme === 'dark' ? (
              <Sun className={cn('h-5 w-5 flex-shrink-0 text-amber-500', sidebarOpen ? 'mr-3' : 'lg:mr-0')} />
            ) : (
              <Moon className={cn('h-5 w-5 flex-shrink-0 text-slate-700', sidebarOpen ? 'mr-3' : 'lg:mr-0')} />
            )}
            <span className={cn('transition-opacity duration-300', !sidebarOpen && 'lg:hidden')}>
              {theme === 'dark' ? t('ライトモード', 'Light Mode') : t('ダークモード', 'Dark Mode')}
            </span>
          </Button>
          
          {/* Language switch */}
          <div 
            className={cn(
              'w-full flex items-center rounded-md px-3 py-2.5',
              !sidebarOpen && 'lg:justify-center lg:px-2'
            )}
          >
            <div className={sidebarOpen ? '' : 'lg:w-full lg:flex lg:justify-center'}>
              <LanguageSwitcher />
            </div>
            <span className={cn('ml-2 text-sm font-medium', !sidebarOpen && 'lg:hidden')}>
              {t('言語設定', 'Language')}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
