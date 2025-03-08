
import React, { useState } from 'react';
import { MessageSquarePlus, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { useFeedback } from '@/hooks/use-feedback';
import FadeIn from '@/components/animations/FadeIn';
import HeartAnimation from '@/components/animations/HeartAnimation';

const FeedbackButton = () => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const { t } = useLanguage();
  const { isOpen, closeFeedback } = useFeedback();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast({
        title: t("入力エラー", "Input Error"),
        description: t("フィードバックを入力してください", "Please enter your feedback"),
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Get the current URL
    const currentUrl = window.location.href;
    
    // In a real app, you would send this to your backend
    console.log("Feedback submitted:", {
      feedback,
      pageUrl: currentUrl,
      path: location.pathname
    });
    
    // Show hearts animation
    setShowHearts(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      closeFeedback();
      setFeedback('');
      
      toast({
        title: t("送信完了", "Submission Complete"),
        description: t("フィードバックをいただきありがとうございます", "Thank you for your feedback"),
      });
      
      // Hide hearts after animation
      setTimeout(() => {
        setShowHearts(false);
      }, 2000);
    }, 1000);
  };

  return (
    <>
      {/* Feedback panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <FadeIn direction="up" duration={400}>
            <div 
              className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
                  {t("フィードバック・機能要望", "Feedback & Feature Requests")}
                </h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeFeedback}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {t("現在のページURL", "Current Page URL")}:
                  </p>
                  <div className="text-xs bg-gray-100 dark:bg-slate-800 p-2 rounded-md overflow-x-auto">
                    {window.location.href}
                  </div>
                </div>
                
                <div className="mb-4">
                  <Textarea
                    placeholder={t("ご意見・ご要望をお聞かせください", "Please share your feedback or feature request")}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={closeFeedback}
                    className="mr-2"
                    disabled={isSubmitting}
                  >
                    {t("キャンセル", "Cancel")}
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t("送信中", "Submitting...")}
                      </span>
                    ) : t("送信", "Submit")}
                  </Button>
                </div>
              </form>

              {showHearts && <HeartAnimation />}
            </div>
          </FadeIn>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
