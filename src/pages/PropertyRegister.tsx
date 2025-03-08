
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Home, Upload, Check, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';

const PropertyRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 仮の送信処理
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "物件登録完了",
        description: "物件情報が正常に登録されました。",
        duration: 5000,
      });
      navigate('/dashboard');
    }, 1500);
  };

  // File input handler
  const handleFileButtonClick = () => {
    // Type casting the element to HTMLInputElement which has the click() method
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden" 
          onClick={toggleMobileMenu}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header toggleMobileMenu={toggleMobileMenu} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-950">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center">
              <Home className="mr-2 h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">物件登録</h1>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">基本情報</h2>
                    <Separator className="my-2" />
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="propertyName">物件名 <span className="text-red-500">*</span></Label>
                        <Input id="propertyName" placeholder="例：スカイタワー麻布十番" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="propertyType">物件タイプ <span className="text-red-500">*</span></Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="物件タイプを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">マンション</SelectItem>
                            <SelectItem value="house">一戸建て</SelectItem>
                            <SelectItem value="shop">店舗</SelectItem>
                            <SelectItem value="office">オフィス</SelectItem>
                            <SelectItem value="land">土地</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">郵便番号 <span className="text-red-500">*</span></Label>
                        <Input id="postalCode" placeholder="例：123-4567" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="prefecture">都道府県 <span className="text-red-500">*</span></Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="選択してください" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tokyo">東京都</SelectItem>
                            <SelectItem value="osaka">大阪府</SelectItem>
                            <SelectItem value="kyoto">京都府</SelectItem>
                            {/* 他の都道府県もここに追加 */}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">市区町村 <span className="text-red-500">*</span></Label>
                        <Input id="city" placeholder="例：港区" required />
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="address">番地・建物名 <span className="text-red-500">*</span></Label>
                      <Input id="address" placeholder="例：麻布十番1-2-3 スカイビル101" required />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">物件詳細</h2>
                    <Separator className="my-2" />
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="price">価格 (万円) <span className="text-red-500">*</span></Label>
                        <Input id="price" type="number" placeholder="例：5000" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="size">面積 (㎡) <span className="text-red-500">*</span></Label>
                        <Input id="size" type="number" placeholder="例：80.5" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="yearBuilt">築年数</Label>
                        <Input id="yearBuilt" type="number" placeholder="例：10" />
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="description">物件説明</Label>
                      <Textarea 
                        id="description" 
                        placeholder="物件の特徴や周辺環境などを入力してください"
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold">画像アップロード</h2>
                    <Separator className="my-2" />
                    <div className="mt-4">
                      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-slate-900">
                        <Upload className="mx-auto h-10 w-10 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          クリックまたはドラッグ＆ドロップで画像をアップロード
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          JPG, PNG, GIF (最大10MB)
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="mt-4"
                          onClick={handleFileButtonClick}
                        >
                          ファイルを選択
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate('/dashboard')}
                    >
                      キャンセル
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="min-w-[120px]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                          <span>登録中...</span>
                        </div>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          登録する
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PropertyRegister;
