
import { ArrowRight, Instagram, Twitter, Facebook, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">StayFlow</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              革新的なテクノロジーソリューションで民泊運営を変革し、ホストをエンパワーし、ゲスト体験を向上させます。
            </p>
            
            <form className="flex gap-2 mb-6 max-w-md">
              <input
                type="email"
                placeholder="メールアドレス"
                className="input-field flex-grow"
                aria-label="メールアドレス"
              />
              <button type="submit" className="btn-primary flex items-center gap-1">
                登録 <ArrowRight size={16} />
              </button>
            </form>
            
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">クイックリンク</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">ホーム</a></li>
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">機能</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">料金</a></li>
              <li><a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">お客様の声</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">よくある質問</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">お問い合わせ</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>東京都</li>
              <li>contact@stayflowapp.com</li>
              <li>03-1234-5678</li>
            </ul>
            
            <div className="mt-6">
              <a 
                href="#"
                className="btn-outline"
              >
                サポートへ連絡
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {currentYear} StayFlow. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                プライバシーポリシー
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                利用規約
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                サイトマップ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
