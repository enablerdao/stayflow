
import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock conversation data
const conversations = [
  {
    id: '1',
    name: '山田 太郎',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yamada',
    lastMessage: 'こんにちは、先日はありがとうございました。',
    timestamp: '10:23',
    unread: 2,
  },
  {
    id: '2',
    name: '佐藤 花子',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sato',
    lastMessage: '予約の件で相談があります。',
    timestamp: '昨日',
    unread: 0,
  },
  {
    id: '3',
    name: '鈴木 一郎',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suzuki',
    lastMessage: 'また次回もよろしくお願いします。',
    timestamp: '昨日',
    unread: 0,
  },
  {
    id: '4',
    name: '田中 美咲',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanaka',
    lastMessage: 'キャンセルしたいのですが...',
    timestamp: '先週',
    unread: 0,
  },
  {
    id: '5',
    name: '伊藤 健太',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ito',
    lastMessage: '写真を送りました。確認お願いします。',
    timestamp: '先週',
    unread: 0,
  },
];

interface MessageSidebarProps {
  onSelectConversation: (id: string) => void;
  selectedConversationId: string | null;
}

const MessageSidebar = ({ onSelectConversation, selectedConversationId }: MessageSidebarProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredConversations = conversations.filter(
    conversation => conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b dark:border-slate-800">
        <h2 className="text-xl font-semibold mb-3">
          {t('メッセージ', 'Messages')}
        </h2>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('検索...', 'Search...')}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" className="flex-shrink-0">
            <Plus className="h-4 w-4 mr-1" />
            {t('新規', 'New')}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        {filteredConversations.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <User className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="font-medium">{t('会話が見つかりません', 'No conversations found')}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t('検索条件を変更してください。', 'Try changing your search terms.')}
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              className={cn(
                "w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors",
                selectedConversationId === conversation.id && "bg-muted"
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <div className="font-medium truncate">{conversation.name}</div>
                    <div className="text-xs text-muted-foreground">{conversation.timestamp}</div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <div className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </div>
                    {conversation.unread > 0 && (
                      <div className="ml-2 flex-shrink-0 rounded-full bg-primary w-5 h-5 flex items-center justify-center text-xs text-primary-foreground">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageSidebar;
