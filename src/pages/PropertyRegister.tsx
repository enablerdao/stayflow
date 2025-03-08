
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Home, Upload, Check, AlertCircle, FileText } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Process bulk text to extract property data
  const processBulkText = () => {
    if (!bulkText.trim()) {
      toast({
        title: "テキストが空です",
        description: "物件情報を入力してください。",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "テキスト処理中",
      description: "入力されたテキストから物件情報を抽出しています...",
      duration: 3000,
    });
    
    // ここにLLMでテキスト処理の実装を追加する予定
    // 今はダミー処理
    console.log("Processing text:", bulkText);
  };

  // File input handlers
  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
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
        <Header toggleMobileMenu={toggleMobileMenu} toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-950">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center">
              <Home className="mr-2 h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">物件登録</h1>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">テキストからの一括入力</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bulkText">
                    物件情報をコピペしてください
                    <span className="text-sm text-muted-foreground ml-2 font-normal">
                      (サイト全体のコピーや不要な文字を含んでいても大丈夫です)
                    </span>
                  </Label>
                  <Textarea 
                    id="bulkText"
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    placeholder="物件情報をここに貼り付けてください。他のサイトからの情報やフォーマットされていない情報も処理できます。"
                    className="min-h-[300px] text-sm font-mono"
                  />
                </div>
                <Button 
                  type="button"
                  onClick={processBulkText}
                  className="w-full"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  テキストから物件情報を抽出する
                </Button>
              </div>
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
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
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

                      {selectedFiles.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="relative">
                              <div className="aspect-square rounded-md overflow-hidden border bg-background">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`アップロード画像 ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="absolute top-1 right-1 rounded-full bg-destructive p-1 text-white"
                                  aria-label="削除"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </div>
                              <p className="mt-1 text-xs truncate">{file.name}</p>
                            </div>
                          ))}
                        </div>
                      )}
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
