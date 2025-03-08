
import { useState } from 'react';
import { LogOut, Settings, User, LogIn } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { toast } = useToast();
  const [userName] = useState('ゲスト');
  const [isLoggedIn] = useState(false); // Currently hardcoded to false for demo mode

  const handleLogout = () => {
    toast({
      title: "ログアウト",
      description: "ログアウトしました。",
    });
  };

  const handleSettings = () => {
    toast({
      title: "設定",
      description: "設定画面は開発中です。",
    });
  };

  const handleProfile = () => {
    toast({
      title: "プロフィール",
      description: "プロフィール画面は開発中です。",
    });
  };

  const handleLogin = () => {
    toast({
      title: "ログイン",
      description: "ログイン機能は開発中です。",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full overflow-hidden h-8 w-8 bg-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <img
            src="https://source.unsplash.com/random/100x100/?portrait"
            alt="User"
            className="h-full w-full object-cover"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex items-center">
          {userName}さん <span className="ml-2 text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 rounded-full">デモ</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoggedIn ? (
          <>
            <DropdownMenuItem onClick={handleProfile}>
              <User className="mr-2 h-4 w-4" />
              <span>プロフィール</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings}>
              <Settings className="mr-2 h-4 w-4" />
              <span>設定</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>ログアウト</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={handleLogin}>
            <LogIn className="mr-2 h-4 w-4" />
            <span>ログイン</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
