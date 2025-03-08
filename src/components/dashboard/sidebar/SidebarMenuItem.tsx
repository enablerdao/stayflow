
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarMenuItemProps {
  name: string;
  icon: LucideIcon;
  href: string;
  isActive: boolean;
  sidebarOpen?: boolean;
  onClick?: () => void;
  className?: string;
}

const SidebarMenuItem = ({
  name,
  icon: Icon,
  href,
  isActive,
  sidebarOpen = true,
  onClick,
  className,
}: SidebarMenuItemProps) => {
  const itemContent = (
    <>
      <Icon 
        className={cn(
          'h-5 w-5 flex-shrink-0 text-primary dark:text-primary', 
          sidebarOpen ? 'mr-3' : 'lg:mr-0'
        )} 
      />
      <span className={cn('transition-opacity duration-300', !sidebarOpen && 'lg:hidden')}>
        {name}
      </span>
    </>
  );

  const baseClasses = cn(
    "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-primary/10 text-primary"
      : "text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-gray-200 dark:hover:bg-slate-800",
    !sidebarOpen && 'lg:justify-center lg:px-2',
    className
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(baseClasses, "w-full justify-start")}
      >
        {itemContent}
      </button>
    );
  }

  return (
    <Link
      to={href === '#' ? '#' : href}
      className={baseClasses}
    >
      {itemContent}
    </Link>
  );
};

export default SidebarMenuItem;
