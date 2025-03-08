
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  Send, 
  Paperclip, 
  Image, 
  File,
  MoreVertical,
  Phone
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock conversation data
const conversations = [
  {
    id: '1',
    name: '山田 太郎',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yamada',
    messages: [
      { id: '1', sender: 'customer', text: 'こんにちは、先日はありがとうございました。', timestamp: '10:15' },
      { id: '2', sender: 'me', text: 'こちらこそありがとうございました。お部屋はいかがでしたか？', timestamp: '10:18' },
      { id: '3', sender: 'customer', text: 'とても快適でした。また利用したいと思います。', timestamp: '10:20' },
      { id: '4', sender: 'me', text: 'ありがとうございます！またのご利用をお待ちしております。', timestamp: '10:22' },
      { id: '5', sender: 'customer', text: 'こんにちは、先日はありがとうございました。', timestamp: '10:23' },
    ]
  },
  {
    id: '2',
    name: '佐藤 花子',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sato',
    messages: [
      { id: '1', sender: 'customer', text: '予約の件で相談があります。', timestamp: '昨日 15:30' },
      { id: '2', sender: 'me', text: 'はい、どのようなことでしょうか？', timestamp: '昨日 15:35' },
    ]
  },
  {
    id: '3',
    name: '鈴木 一郎',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suzuki',
    messages: [
      { id: '1', sender: 'me', text: '先日はご利用ありがとうございました。', timestamp: '昨日 12:10' },
      { id: '2', sender: 'customer', text: 'また次回もよろしくお願いします。', timestamp: '昨日 12:45' },
    ]
  },
  {
    id: '4',
    name: '田中 美咲',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanaka',
    messages: [
      { id: '1', sender: 'customer', text: 'キャンセルしたいのですが、可能でしょうか？', timestamp: '先週 月曜日' },
      { id: '2', sender: 'me', text: '申し訳ございませんが、キャンセルポリシーをご確認いただけますでしょうか。', timestamp: '先週 月曜日' },
    ]
  },
  {
    id: '5',
    name: '伊藤 健太',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ito',
    messages: [
      { id: '1', sender: 'customer', text: '写真を送りました。確認お願いします。', timestamp: '先週 金曜日' },
    ]
  },
];

interface MessageChatProps {
  conversationId: string;
  toggleSidebar: () => void;
  showBackButton: boolean;
}

const MessageChat = ({ conversationId, toggleSidebar, showBackButton }: MessageChatProps) => {
  const { t } = useLanguage();
  const [newMessage, setNewMessage] = useState('');
  const [currentConversation, setCurrentConversation] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const conversation = conversations.find(c => c.id === conversationId);
    setCurrentConversation(conversation);
    
    // Scroll to bottom on conversation change
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [conversationId]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would send to an API
    console.log('Sending message:', newMessage);
    
    // Simulate adding a new message to the conversation
    if (currentConversation) {
      const updatedConversation = {
        ...currentConversation,
        messages: [
          ...currentConversation.messages,
          {
            id: Date.now().toString(),
            sender: 'me',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      
      setCurrentConversation(updatedConversation);
      setNewMessage('');
      
      // Scroll to bottom after sending
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!currentConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p>{t('会話を読み込み中...', 'Loading conversation...')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b dark:border-slate-800 p-4">
        <div className="flex items-center">
          {showBackButton && (
            <Button variant="ghost" size="sm" onClick={toggleSidebar} className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <Avatar className="h-9 w-9">
            <AvatarImage src={currentConversation.avatar} alt={currentConversation.name} />
            <AvatarFallback>{currentConversation.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-3 flex-1">
            <h3 className="font-medium">{currentConversation.name}</h3>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Phone className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{t('連絡先を表示', 'View contact')}</DropdownMenuItem>
                <DropdownMenuItem>{t('予約を表示', 'View bookings')}</DropdownMenuItem>
                <DropdownMenuItem>{t('ミュート', 'Mute conversation')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {currentConversation.messages.map((message: any) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[75%]">
              {message.sender !== 'me' && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={currentConversation.avatar} alt={currentConversation.name} />
                  <AvatarFallback>{currentConversation.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="break-words">{message.text}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="border-t dark:border-slate-800 p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t('メッセージを入力...', 'Type a message...')}
              className="min-h-[2.5rem] resize-none px-4 py-2"
            />
          </div>
          <div className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Image className="h-4 w-4 mr-2" />
                  {t('画像', 'Image')}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <File className="h-4 w-4 mr-2" />
                  {t('ファイル', 'File')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageChat;
