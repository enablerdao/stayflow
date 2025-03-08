
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EmailSignUpForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "メールアドレスを入力してください",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate a random password that meets complexity requirements
      const randomPassword = Math.random().toString(36).slice(-10) + 
                            'A1!' + 
                            Math.random().toString(36).slice(-5);
      
      const { error } = await supabase.auth.signUp({
        email,
        password: randomPassword,
        options: {
          data: {
            email: email,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "登録メールを送信しました",
        description: "メールをご確認いただき、記載されているリンクをクリックしてください。",
        duration: 5000,
      });

    } catch (error: any) {
      toast({
        title: "登録エラー",
        description: error.message || "登録中にエラーが発生しました。",
        variant: "destructive",
        duration: 5000,
      });
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium">
          メールアドレス
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Mail className="h-5 w-5" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="your-email@example.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
            <span>送信中...</span>
          </div>
        ) : (
          "メールアドレスのみで登録"
        )}
      </Button>
    </form>
  );
};

export default EmailSignUpForm;
