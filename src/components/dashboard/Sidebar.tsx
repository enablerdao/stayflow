
import { useState } from 'react';
import { ChevronLeft, Home, User, Calendar, BarChart2, Settings, Sun, Moon, Globe, Heart, MessageSquare, FileText, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  mobileView?: boolean;
}

const Sidebar = ({ sidebarOpen, toggleSidebar, mobileView = false }: SidebarProps) => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState('ja');
  const location = useLocation();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const menuItems = [
    { name: 'ホーム', icon: Home, href: '/dashboard' },
    { name: 'お客様管理', icon: User, href: '#' },
    { name: '予約管理', icon: Calendar, href: '/reservations' },
    { name: 'メッセージ', icon: MessageSquare, href: '#' },
    { name: 'お気に入り', icon: Heart, href: '#' },
    { name: 'レポート', icon: FileText, href: '#' },
    { name: '分析', icon: BarChart2, href: '#' },
  ];

  const bottomMenuItems = [
    { name: '新規作成', icon: PlusCircle, href: '#' },
    { name: '設定', icon: Settings, href: '#' },
  ];
  
  // Check if a menu item is active based on current path
  const isActive = (href: string) => {
    if (href === '#') return false;
    return location.pathname === href;
  };
  
  // モバイルビューの場合は別のレイアウトを使用
  if (mobileView) {
    return (
      <nav className="px-3 py-4 space-y-1.5">
        {menuItems.map((item, index) => (
          <FadeIn key={item.name} direction="left" delay={index * 50} duration={300}>
            <Link
              to={item.href === '#' ? '#' : item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800"
              )}
            >
              <item.icon className="h-5 w-5 mr-3 text-primary dark:text-primary" />
              <span>{item.name}</span>
            </Link>
          </FadeIn>
        ))}
        
        <div className="my-3 border-t dark:border-slate-800"></div>
        
        {bottomMenuItems.map((item, index) => (
          <FadeIn key={item.name} direction="left" delay={(menuItems.length + index) * 50} duration={300}>
            <Link
              to={item.href === '#' ? '#' : item.href}
              className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <item.icon className="h-5 w-5 mr-3 text-primary dark:text-primary" />
              <span>{item.name}</span>
            </Link>
          </FadeIn>
        ))}
        
        {/* ダークモード切替 */}
        <FadeIn direction="left" delay={(menuItems.length + bottomMenuItems.length) * 50} duration={300}>
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className="w-full flex items-center justify-start rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800 transition-all duration-200"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 mr-3 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 mr-3 text-slate-700" />
            )}
            <span>{theme === 'dark' ? 'ライトモード' : 'ダークモード'}</span>
          </Button>
        </FadeIn>
      </nav>
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
          aria-label="サイドバーを切り替える"
        >
          <ChevronLeft
            className={cn('h-5 w-5 transition-transform duration-300', !sidebarOpen && 'rotate-180')}
          />
        </button>
      </div>
      
      <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
        <nav className="mt-6 px-3 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href === '#' ? '#' : item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800",
                !sidebarOpen && 'lg:justify-center lg:px-2'
              )}
            >
              <item.icon className={cn('h-5 w-5 flex-shrink-0 text-primary dark:text-primary', sidebarOpen ? 'mr-3' : 'lg:mr-0')} />
              <span className={cn('transition-opacity duration-300', !sidebarOpen && 'lg:hidden')}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
          
        <div className="mb-6 px-3 space-y-1.5">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href === '#' ? '#' : item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800 transition-all duration-200",
                !sidebarOpen && 'lg:justify-center lg:px-2'
              )}
            >
              <item.icon className={cn('h-5 w-5 flex-shrink-0 text-primary dark:text-primary', sidebarOpen ? 'mr-3' : 'lg:mr-0')} />
              <span className={cn('transition-opacity duration-300', !sidebarOpen && 'lg:hidden')}>
                {item.name}
              </span>
            </Link>
          ))}
          
          {/* ダークモード切替 */}
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
              {theme === 'dark' ? 'ライトモード' : 'ダークモード'}
            </span>
          </Button>
          
          {/* モバイル用の言語切替 */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              className={cn(
                'w-full flex items-center justify-start rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800 transition-all duration-200',
                !sidebarOpen && 'lg:justify-center lg:px-2'
              )}
            >
              <Globe className={cn('h-5 w-5 flex-shrink-0 text-primary dark:text-primary', sidebarOpen ? 'mr-3' : 'lg:mr-0')} />
              <span className={cn('transition-opacity duration-300', !sidebarOpen && 'lg:hidden')}>
                言語設定
              </span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
