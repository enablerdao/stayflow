
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';
import { Moon, Sun, ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import LanguageSwitcher from '@/components/language/LanguageSwitcher';

interface MenuItem {
  name: string;
  icon: LucideIcon;
  href: string;
  hasSubmenu?: boolean;
  submenu?: MenuItem[];
  onClick?: () => void;
}

interface MobileSidebarProps {
  menuItems: MenuItem[];
  bottomMenuItems: MenuItem[];
  isActive: (href: string) => boolean;
  isSubmenuActive: (submenu: MenuItem[]) => boolean;
}

const MobileSidebar = ({
  menuItems,
  bottomMenuItems,
  isActive,
  isSubmenuActive,
}: MobileSidebarProps) => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [propertyMenuOpen, setPropertyMenuOpen] = useState(false);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const togglePropertyMenu = () => {
    setPropertyMenuOpen(!propertyMenuOpen);
  };

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
          {item.hasSubmenu ? (
            <div className="space-y-1">
              <button
                onClick={togglePropertyMenu}
                className={cn(
                  "w-full flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  (propertyMenuOpen || isSubmenuActive(item.submenu!))
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800"
                )}
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3 text-primary dark:text-primary" />
                  <span>{item.name}</span>
                </div>
                {propertyMenuOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {propertyMenuOpen && (
                <div className="pl-4 space-y-1">
                  {item.submenu!.map((subItem, subIndex) => (
                    <FadeIn key={subItem.name} direction="left" delay={subIndex * 50} duration={300}>
                      <Link
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
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>
          ) : item.onClick ? (
            <button
              onClick={item.onClick}
              className="w-full flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <item.icon className="h-5 w-5 mr-3 text-primary dark:text-primary" />
              <span>{item.name}</span>
            </button>
          ) : (
            <Link
              to={item.href === '#' ? '#' : item.href}
              className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <item.icon className="h-5 w-5 mr-3 text-primary dark:text-primary" />
              <span>{item.name}</span>
            </Link>
          )}
        </FadeIn>
      ))}
      
      {/* Theme toggle */}
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
          <span>{theme === 'dark' ? t('ライトモード', 'Light Mode') : t('ダークモード', 'Dark Mode')}</span>
        </Button>
      </FadeIn>
      
      {/* Language switch */}
      <FadeIn direction="left" delay={(menuItems.length + bottomMenuItems.length + 1) * 50} duration={300}>
        <div className="w-full flex items-center justify-start rounded-md px-3 py-2.5 text-sm font-medium">
          <LanguageSwitcher />
          <span className="ml-2">{t('言語設定', 'Language')}</span>
        </div>
      </FadeIn>
    </nav>
  );
};

export default MobileSidebar;
