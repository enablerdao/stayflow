
import { useState, useRef, useEffect } from 'react';
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
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", 
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", 
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", 
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", 
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", 
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", 
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

const propertyTypes = [
  { value: "apartment", label: "マンション" },
  { value: "house", label: "一戸建て" },
  { value: "shop", label: "店舗" },
  { value: "office", label: "オフィス" },
  { value: "land", label: "土地" }
];

const PropertyRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form fields
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [prefecture, setPrefecture] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [size, setSize] = useState<number | ''>('');
  const [yearBuilt, setYearBuilt] = useState<number | ''>('');
  const [description, setDescription] = useState('');

  // Check if user is authenticated
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsLoading(false);

      // Subscribe to auth changes
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
        }
      );

      return () => subscription.unsubscribe();
    };

    checkUser();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "認証エラー",
        description: "物件を登録するにはログインが必要です。",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Insert property data
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .insert({
          user_id: user.id,
          property_name: propertyName,
          property_type: propertyType,
          postal_code: postalCode,
          prefecture: prefecture,
          city: city,
          address: address,
          price: price,
          size: size,
          year_built: yearBuilt || null,
          description: description || null
        })
        .select()
        .single();

      if (propertyError) throw propertyError;

      // Upload images if available
      if (selectedFiles.length > 0) {
        await Promise.all(selectedFiles.map(async (file, index) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${uuidv4()}.${fileExt}`;
          const filePath = `${user.id}/${propertyData.id}/${fileName}`;

          // Upload file to storage
          const { error: uploadError } = await supabase.storage
            .from('property_images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          // Create record in property_images table
          const { error: imageError } = await supabase
            .from('property_images')
            .insert({
              property_id: propertyData.id,
              storage_path: filePath,
              display_order: index + 1
            });

          if (imageError) throw imageError;
        }));
      }

      setIsSubmitting(false);
      toast({
        title: "物件登録完了",
        description: "物件情報が正常に登録されました。",
        duration: 5000,
      });
      navigate('/dashboard');
    } catch (error: any) {
      setIsSubmitting(false);
      toast({
        title: "エラーが発生しました",
        description: error.message || "物件登録中にエラーが発生しました。",
        variant: "destructive",
        duration: 5000,
      });
      console.error("Property registration error:", error);
    }
  };

  // Process bulk text to extract property data
  const processBulkText = async () => {
    if (!bulkText.trim()) {
      toast({
        title: "テキストが空です",
        description: "物件情報を入力してください。",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      toast({
        title: "テキスト処理中",
        description: "入力されたテキストから物件情報を抽出しています...",
        duration: 3000,
      });
      
      // ここに実際のLLMで処理するコードを追加
      // 仮の処理として、単純なパターンマッチで情報を抽出
      setTimeout(() => {
        // 簡易的な情報抽出（実際にはLLMを使用）
        const extractProperty = (text: string) => {
          let name = text.match(/(?:物件名|マンション名)[:：]?\s*([^\n,]+)/i)?.[1] || '';
          let type = text.includes('マンション') ? 'apartment' : 
                     text.includes('一戸建て') ? 'house' : 
                     text.includes('店舗') ? 'shop' : 
                     text.includes('オフィス') ? 'office' : 
                     text.includes('土地') ? 'land' : '';
          let postalCodeMatch = text.match(/〒?\s*(\d{3}[-－]?\d{4})/);
          let postalCode = postalCodeMatch ? postalCodeMatch[1] : '';
          
          // 都道府県を検出
          let detectedPrefecture = '';
          for (const pref of prefectures) {
            if (text.includes(pref)) {
              detectedPrefecture = pref;
              break;
            }
          }
          
          // 市区町村を正規表現でざっくり抽出（実際のLLMではもっと精度が高い）
          let cityMatch = text.match(new RegExp(`${detectedPrefecture}([^\\d\\n]{2,10}区?市?町?村?)`));
          let city = cityMatch ? cityMatch[1].trim() : '';
          
          // 住所の残りの部分
          let addressMatch = text.match(new RegExp(`${detectedPrefecture}${city}([^\\n]+)`));
          let address = addressMatch ? addressMatch[1].trim() : '';
          
          // 価格（万円）
          let priceMatch = text.match(/(?:価格|販売価格)[:：]?\s*(\d{1,3}[,，]?\d{3}|\d{1,3})(?:万円)?/);
          let price = priceMatch ? parseInt(priceMatch[1].replace(/[,，]/g, '')) : '';
          
          // 面積（㎡）
          let sizeMatch = text.match(/(?:面積|専有面積)[:：]?\s*(\d+\.?\d*)(?:\s*[㎡m²])?/);
          let size = sizeMatch ? parseFloat(sizeMatch[1]) : '';
          
          // 築年数
          let yearMatch = text.match(/(?:築|築年数)[:：]?\s*(\d{1,2})(?:年)?/);
          let year = yearMatch ? new Date().getFullYear() - parseInt(yearMatch[1]) : '';
          
          // 説明文（最初の100文字程度）
          let desc = text.substring(0, 200).replace(/\n+/g, ' ');
          
          return { name, type, postalCode, prefecture: detectedPrefecture, city, address, price, size, year, desc };
        };
        
        const extracted = extractProperty(bulkText);
        
        // 抽出した情報をフォームにセット
        setPropertyName(extracted.name);
        setPropertyType(extracted.type);
        setPostalCode(extracted.postalCode);
        setPrefecture(extracted.prefecture);
        setCity(extracted.city);
        setAddress(extracted.address);
        setPrice(extracted.price as any);
        setSize(extracted.size as any);
        setYearBuilt(extracted.year as any);
        setDescription(extracted.desc);
        
        setIsProcessing(false);
        
        toast({
          title: "処理完了",
          description: "テキストから物件情報を抽出しました。内容を確認して必要に応じて編集してください。",
          duration: 5000,
        });
      }, 2000); // 2秒後に処理完了（実際にはLLM APIの応答時間に依存）
    } catch (error: any) {
      setIsProcessing(false);
      toast({
        title: "処理エラー",
        description: error.message || "テキスト処理中にエラーが発生しました。",
        variant: "destructive",
        duration: 3000,
      });
    }
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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
        <h1 className="mb-2 text-2xl font-bold">ログインが必要です</h1>
        <p className="mb-6 text-center text-muted-foreground">
          物件を登録するには、ログインまたはアカウント登録が必要です。
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/login')}>
            ログイン
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            ダッシュボードに戻る
          </Button>
        </div>
      </div>
    );
  }

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
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                      処理中...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      テキストから物件情報を抽出する
                    </>
                  )}
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
                        <Input 
                          id="propertyName" 
                          placeholder="例：スカイタワー麻布十番" 
                          required 
                          value={propertyName}
                          onChange={(e) => setPropertyName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="propertyType">物件タイプ <span className="text-red-500">*</span></Label>
                        <Select 
                          value={propertyType} 
                          onValueChange={setPropertyType}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="物件タイプを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">郵便番号 <span className="text-red-500">*</span></Label>
                        <Input 
                          id="postalCode" 
                          placeholder="例：123-4567" 
                          required 
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="prefecture">都道府県 <span className="text-red-500">*</span></Label>
                        <Select 
                          value={prefecture} 
                          onValueChange={setPrefecture}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="選択してください" />
                          </SelectTrigger>
                          <SelectContent>
                            {prefectures.map((pref) => (
                              <SelectItem key={pref} value={pref}>{pref}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">市区町村 <span className="text-red-500">*</span></Label>
                        <Input 
                          id="city" 
                          placeholder="例：港区" 
                          required 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="address">番地・建物名 <span className="text-red-500">*</span></Label>
                      <Input 
                        id="address" 
                        placeholder="例：麻布十番1-2-3 スカイビル101" 
                        required 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">物件詳細</h2>
                    <Separator className="my-2" />
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="price">価格 (万円) <span className="text-red-500">*</span></Label>
                        <Input 
                          id="price" 
                          type="number" 
                          placeholder="例：5000" 
                          required 
                          value={price}
                          onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="size">面積 (㎡) <span className="text-red-500">*</span></Label>
                        <Input 
                          id="size" 
                          type="number" 
                          placeholder="例：80.5" 
                          required 
                          value={size}
                          onChange={(e) => setSize(e.target.value ? Number(e.target.value) : '')}
                          step="0.1"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="yearBuilt">築年数</Label>
                        <Input 
                          id="yearBuilt" 
                          type="number" 
                          placeholder="例：10" 
                          value={yearBuilt}
                          onChange={(e) => setYearBuilt(e.target.value ? Number(e.target.value) : '')}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="description">物件説明</Label>
                      <Textarea 
                        id="description" 
                        placeholder="物件の特徴や周辺環境などを入力してください"
                        className="min-h-[120px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
