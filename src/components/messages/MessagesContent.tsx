
import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useLocation } from 'react-router-dom';
import MessageSidebar from './MessageSidebar';
import MessageChat from './MessageChat';
import FadeIn from '@/components/animations/FadeIn';

const MessagesContent = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCustomerId = queryParams.get('customer');
  
  const [selectedConversation, setSelectedConversation] = useState<string | null>(initialCustomerId);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(!initialCustomerId || window.innerWidth >= 768);
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile) setShowSidebar(true);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    if (isMobileView) {
      setShowSidebar(false);
    }
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <main className="flex-1 overflow-hidden">
      <FadeIn direction="up" duration={500}>
        <div className="flex h-full">
          {showSidebar && (
            <div className={`${isMobileView ? 'w-full' : 'w-[320px]'} border-r dark:border-slate-800`}>
              <MessageSidebar 
                onSelectConversation={handleSelectConversation} 
                selectedConversationId={selectedConversation} 
              />
            </div>
          )}
          
          {(!isMobileView || !showSidebar) && (
            <div className="flex-1">
              {selectedConversation ? (
                <MessageChat 
                  conversationId={selectedConversation} 
                  toggleSidebar={toggleSidebar}
                  showBackButton={isMobileView}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">
                      {t('会話を選択してください', 'Select a conversation')}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {t('左側のリストから会話を選択してメッセージを表示します。', 
                         'Choose a conversation from the list to start messaging.')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </FadeIn>
    </main>
  );
};

export default MessagesContent;
