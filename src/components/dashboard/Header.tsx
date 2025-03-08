
import { Menu, Bell, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import UserProfile from './UserProfile';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

const Header = ({ toggleMobileMenu }: HeaderProps) => {
  return (
    <header className="bg-white shadow dark:bg-slate-900">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden dark:hover:bg-slate-800"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">ダッシュボード</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="検索..."
              className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button className="rounded-full bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700">
            <Bell className="h-5 w-5" />
          </button>
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
