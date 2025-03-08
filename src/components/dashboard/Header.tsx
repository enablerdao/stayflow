
import { Menu, Bell, Search, ChevronRight, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import UserProfile from './UserProfile';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

interface HeaderProps {
  toggleMobileMenu: () => void;
  toggleSidebar: () => void;
}

const Header = ({ toggleMobileMenu, toggleSidebar }: HeaderProps) => {
  const { theme } = useTheme();
  const [language, setLanguage] = useState('ja');

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <header className="bg-white shadow-sm dark:bg-slate-900 border-b dark:border-slate-800 relative z-50">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMobileMenu}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-300 dark:hover:bg-slate-800"
            aria-label="モバイルメニューを開く"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={toggleSidebar}
            className="hidden rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:flex dark:text-gray-300 dark:hover:bg-slate-800"
            aria-label="サイドバーを切り替える"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="ml-2 flex items-center">
            <div className="lg:hidden">
              <Logo size="sm" />
            </div>
            <div className="hidden lg:block">
              <Logo size="md" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="検索... / Search..."
              className="h-9 w-64 rounded-md border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          
          {/* 言語選択 - モバイルでは非表示 */}
          <div className="hidden md:flex">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[90px] h-9 bg-transparent border-gray-300 dark:border-slate-700">
                <SelectValue placeholder="言語" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
            aria-label="通知"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
