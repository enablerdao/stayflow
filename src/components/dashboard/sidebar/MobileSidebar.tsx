
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  name: string;
  icon: LucideIcon;
  href: string;
  onClick?: () => void;
  hasSubmenu?: boolean;
  submenu?: MenuItem[];
}

interface MobileSidebarProps {
  menuItems: MenuItem[];
  bottomMenuItems: MenuItem[];
  isActive: (href: string) => boolean;
  isSubmenuActive: (submenu: MenuItem[]) => boolean;
}

const MobileSidebar = ({ menuItems, bottomMenuItems, isActive, isSubmenuActive }: MobileSidebarProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.hasSubmenu && item.submenu ? (
                <>
                  <div className="py-2">
                    <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                      <item.icon className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                      {item.name}
                    </div>
                  </div>
                  <div className="pl-10 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          isActive(subItem.href) 
                            ? "bg-primary/10 text-primary" 
                            : "text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800"
                        )}
                      >
                        <subItem.icon className="h-5 w-5 mr-3 text-primary" />
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.href === '#' ? '#' : item.href}
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive(item.href) 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3 text-primary" />
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 py-4 px-2">
        <nav className="space-y-1">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href === '#' ? '#' : item.href}
              onClick={item.onClick}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(item.href) 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800"
              )}
            >
              <item.icon className="h-5 w-5 mr-3 text-primary" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileSidebar;
