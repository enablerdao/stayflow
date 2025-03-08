
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Home, Check, AlertCircle } from 'lucide-react';
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
