
import { useState } from 'react';
import { ChevronLeft, Home, User, Calendar, BarChart2, Settings, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import { useTheme } from '@/hooks/use-theme';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ sidebarOpen, toggleSidebar }: SidebarProps) => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 h-full w-64 bg-white shadow-md transition-all duration-300 lg:static dark:bg-slate-900',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-20 lg:translate-x-0'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className={cn('transition-all duration-300', !sidebarOpen && 'lg:opacity-0')}>
          <Logo size="sm" />
        </div>
        <button
          onClick={toggleSidebar}
          className="hidden rounded-md p-1.5 text-gray-400 hover:bg-gray-100 lg:block dark:hover:bg-slate-800"
        >
          <ChevronLeft
            className={cn('h-5 w-5 transition-transform duration-300', !sidebarOpen && 'rotate-180')}
          />
        </button>
      </div>
      <nav className="mt-6 space-y-1 px-2">
        {[
          { name: 'ホーム', icon: Home, href: '/dashboard' },
          { name: 'お客様管理', icon: User, href: '#' },
          { name: '予約管理', icon: Calendar, href: '#' },
          { name: '分析', icon: BarChart2, href: '#' },
          { name: '設定', icon: Settings, href: '#' },
        ].map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              'group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-primary/10 hover:text-primary dark:text-gray-300',
              !sidebarOpen && 'lg:justify-center'
            )}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0 lg:mr-0" />
            <span className={cn('transition-opacity duration-300', !sidebarOpen && 'lg:hidden')}>
              {item.name}
            </span>
          </a>
        ))}
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className={cn(
            'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-primary/10 hover:text-primary dark:text-gray-300',
            !sidebarOpen && 'lg:justify-center'
          )}
        >
          {theme === 'dark' ? (
            <Sun className="mr-3 h-5 w-5 flex-shrink-0 lg:mr-0" />
          ) : (
            <Moon className="mr-3 h-5 w-5 flex-shrink-0 lg:mr-0" />
          )}
          <span className={cn('transition-opacity duration-300', !sidebarOpen && 'lg:hidden')}>
            {theme === 'dark' ? 'ライトモード' : 'ダークモード'}
          </span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
