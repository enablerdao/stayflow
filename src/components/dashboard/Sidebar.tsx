
import { useState } from 'react';
import { ChevronLeft, Home, User, Calendar, BarChart2, Settings, Sun, Moon, Globe, Heart, MessageSquare, FileText, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  mobileView?: boolean;
}

const Sidebar = ({ sidebarOpen, toggleSidebar, mobileView = false }: SidebarProps) => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState('ja');
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const menuItems = [
    { name: 'ホーム', icon: Home, href: '/dashboard' },
    { name: 'お客様管理', icon: User, href: '#' },
    { name: '予約管理', icon: Calendar, href: '#' },
    { name: 'メッセージ', icon: MessageSquare, href: '#' },
    { name: 'お気に入り', icon: Heart, href: '#' },
    { name: 'レポート', icon: FileText, href: '#' },
    { name: '分析', icon: BarChart2, href: '#' },
  ];

  const bottomMenuItems = [
    { name: '新規作成', icon: PlusCircle, href: '#' },
    { name: '設定', icon: Settings, href: '#' },
  ];
  
  // モバイルビューの場合は別のレイアウトを使用
  if (mobileView) {
    return (
      <nav className="px-3 py-4 space-y-1.5">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800"
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.name}</span>
          </a>
        ))}
        
        <div className="my-3 border-t dark:border-slate-800"></div>
        
        {bottomMenuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800"
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.name}</span>
          </a>
        ))}
        
        {/* ダークモード切替 */}
        <Button
          onClick={toggleTheme}
          variant="ghost"
          className="w-full flex items-center justify-start rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 mr-3" />
          ) : (
            <Moon className="h-5 w-5 mr-3" />
          )}
          <span>{theme === 'dark' ? 'ライトモード' : 'ダークモード'}</span>
        </Button>
      </nav>
    );
  }
  
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 h-full bg-white shadow-sm transition-all duration-300 lg:static dark:bg-slate-900 dark:border-r dark:border-slate-800',
        sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:w-20 lg:translate-x-0'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b dark:border-slate-800">
        <div className={cn('transition-all duration-300', !sidebarOpen && 'lg:opacity-0')}>
          <Logo size="sm" />
        </div>
        <button
          onClick={toggleSidebar}
          className="hidden rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:block dark:text-gray-300 dark:hover:bg-slate-800"
          aria-label="サイドバーを切り替える"
        >
          <ChevronLeft
            className={cn('h-5 w-5 transition-transform duration-300', !sidebarOpen && 'rotate-180')}
          />
        </button>
      </div>
      
      <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
        <nav className="mt-6 px-3 space-y-1.5">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800',
                !sidebarOpen && 'lg:justify-center lg:px-2'
              )}
            >
              <item.icon className={cn('h-5 w-5 flex-shrink-0', sidebarOpen ? 'mr-3' : 'lg:mr-0')} />
              <span className={cn('transition-opacity duration-300', !sidebarOpen && 'lg:hidden')}>
                {item.name}
              </span>
            </a>
          ))}
        </nav>
          
        <div className="mb-6 px-3 space-y-1.5">
          {bottomMenuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800',
                !sidebarOpen && 'lg:justify-center lg:px-2'
              )}
            >
              <item.icon className={cn('h-5 w-5 flex-shrink-0', sidebarOpen ? 'mr-3' : 'lg:mr-0')} />
              <span className={cn('transition-opacity duration-300', !sidebarOpen && 'lg:hidden')}>
                {item.name}
              </span>
            </a>
          ))}
          
          {/* ダークモード切替 */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className={cn(
              'w-full flex items-center justify-start rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800',
              !sidebarOpen && 'lg:justify-center lg:px-2'
            )}
          >
            {theme === 'dark' ? (
              <Sun className={cn('h-5 w-5 flex-shrink-0', sidebarOpen ? 'mr-3' : 'lg:mr-0')} />
            ) : (
              <Moon className={cn('h-5 w-5 flex-shrink-0', sidebarOpen ? 'mr-3' : 'lg:mr-0')} />
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
                'w-full flex items-center justify-start rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800',
                !sidebarOpen && 'lg:justify-center lg:px-2'
              )}
            >
              <Globe className={cn('h-5 w-5 flex-shrink-0', sidebarOpen ? 'mr-3' : 'lg:mr-0')} />
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
