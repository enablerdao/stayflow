
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Home, Check, AlertCircle, LogIn, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { PropertyFormData } from '@/data/propertyData';
import BulkTextProcessor from '@/components/property/BulkTextProcessor';
import BasicInfoSection from '@/components/property/BasicInfoSection';
import PropertyDetailsSection from '@/components/property/PropertyDetailsSection';
import ImageUploader from '@/components/property/ImageUploader';
import FadeIn from '@/components/animations/FadeIn';
import EmailSignUpForm from '@/components/auth/EmailSignUpForm';

const PropertyRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Form fields
  const [formData, setFormData] = useState<PropertyFormData>({
    propertyName: '',
    propertyType: '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    price: '',
    size: '',
    yearBuilt: '',
    description: ''
  });

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

  const handleFormUpdate = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          property_name: formData.propertyName,
          property_type: formData.propertyType,
          postal_code: formData.postalCode,
          prefecture: formData.prefecture,
          city: formData.city,
          address: formData.address,
          price: formData.price as number,
          size: formData.size as number,
          year_built: formData.yearBuilt || null,
          description: formData.description || null
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

  const handleBulkProcessed = (extractedData: PropertyFormData) => {
    setFormData(extractedData);
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
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-6 px-4 py-16">
          <FadeIn direction="up">
            <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/30">
              <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400" />
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={100}>
            <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
              ログインが必要です
            </h1>
          </FadeIn>
          
          <FadeIn direction="up" delay={200}>
            <p className="max-w-md text-center text-lg text-gray-600 dark:text-gray-300">
              物件を登録するには、ログインまたはアカウント登録が必要です。初めての方はメールアドレスを入力するだけで簡単に登録できます。
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={300}>
            <div className="mt-4 w-full max-w-sm">
              <EmailSignUpForm />
              
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
                <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">または</span>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              
              <div className="grid gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <LogIn className="mr-2 h-5 w-5" />
                  既存アカウントでログイン
                  <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="group border-2 transition-all duration-300 hover:bg-background/80"
                >
                  ダッシュボードに戻る
                </Button>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={400}>
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                アカウントを作成すると、物件情報の管理や予約の確認が簡単に行えます。
              </p>
            </div>
          </FadeIn>
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

            <BulkTextProcessor onProcessed={handleBulkProcessed} />

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <BasicInfoSection formData={formData} onUpdate={handleFormUpdate} />
                  
                  <PropertyDetailsSection formData={formData} onUpdate={handleFormUpdate} />
                  
                  <ImageUploader 
                    selectedFiles={selectedFiles} 
                    onFilesChange={setSelectedFiles} 
                  />
                  
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
