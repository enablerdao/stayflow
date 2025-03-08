
import React from 'react';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import FadeIn from '@/components/animations/FadeIn';

interface SubmenuItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

interface SidebarSubmenuProps {
  name: string;
  icon: LucideIcon;
  submenu: SubmenuItem[];
  isOpen: boolean;
  toggleMenu: () => void;
  sidebarOpen: boolean;
  isActive: (href: string) => boolean;
  isSubmenuActive: boolean;
}

const SidebarSubmenu = ({
  name,
  icon: Icon,
  submenu,
  isOpen,
  toggleMenu,
  sidebarOpen,
  isActive,
  isSubmenuActive,
}: SidebarSubmenuProps) => {
  return (
    <div className="space-y-1">
      <button
        onClick={toggleMenu}
        className={cn(
          "w-full group flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
          (isOpen || isSubmenuActive)
            ? "bg-primary/10 text-primary"
            : "text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800",
          !sidebarOpen && 'lg:justify-center lg:px-2'
        )}
      >
        <div className="flex items-center">
          <Icon className={cn('h-5 w-5 flex-shrink-0 text-primary dark:text-primary', sidebarOpen ? 'mr-3' : 'lg:mr-0')} />
          <span className={cn('transition-opacity duration-300', !sidebarOpen && 'lg:hidden')}>
            {name}
          </span>
        </div>
        {sidebarOpen && (
          isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        )}
      </button>
      
      {isOpen && sidebarOpen && (
        <div className="pl-4 space-y-1 mt-1">
          {submenu.map((subItem) => (
            <Link
              key={subItem.name}
              to={subItem.href === '#' ? '#' : subItem.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ml-2",
                isActive(subItem.href)
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800"
              )}
            >
              <subItem.icon className="h-4 w-4 mr-3 text-primary dark:text-primary" />
              <span>{subItem.name}</span>
            </Link>
          ))}
        </div>
      )}
      
      {!sidebarOpen && isOpen && (
        <div className="fixed left-20 mt-0 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1 space-y-1">
            {submenu.map((subItem) => (
              <Link
                key={subItem.name}
                to={subItem.href === '#' ? '#' : subItem.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-700",
                  isActive(subItem.href) && "bg-primary/10 text-primary"
                )}
              >
                <subItem.icon className="h-4 w-4 mr-3 text-primary dark:text-primary" />
                <span>{subItem.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarSubmenu;
