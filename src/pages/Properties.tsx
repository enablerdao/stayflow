
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { useMobileView } from '@/hooks/use-mobile';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { PlusCircle, Building, MapPin, Calendar, Yen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import FadeIn from '@/components/animations/FadeIn';

// Demo property data for when no properties exist
const demoProperty = {
  id: "demo-1",
  property_name: "スカイタワー麻布十番",
  property_type: "apartment",
  prefecture: "東京都",
  city: "港区",
  address: "麻布十番1-2-3",
  price: 85000000,
  size: 75.5,
  year_built: 2020,
  created_at: new Date().toISOString()
};

interface Property {
  id: string;
  property_name: string;
  property_type: string;
  prefecture: string;
  city: string;
  address: string;
  price: number;
  size: number;
  year_built: number | null;
  created_at: string;
}

const Properties = () => {
  const { t } = useLanguage();
  const { isMobileView, sidebarOpen, toggleSidebar } = useMobileView();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        const isAuthenticated = !!session?.session;
        
        if (isAuthenticated) {
          // If user is authenticated, fetch their properties
          const { data, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (error) throw error;
          setProperties(data || []);
        } else {
          // If not authenticated, use the demo property
          setProperties([demoProperty as unknown as Property]);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        // Fallback to demo property on error
        setProperties([demoProperty as unknown as Property]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleCreateProperty = () => {
    navigate('/property/register');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getPropertyTypeLabel = (type: string) => {
    const types = {
      apartment: t('マンション', 'Apartment'),
      house: t('一戸建て', 'House'),
      shop: t('店舗', 'Shop'),
      office: t('オフィス', 'Office'),
      land: t('土地', 'Land')
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} mobileView={isMobileView} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          toggleMobileMenu={toggleSidebar}
          toggleSidebar={toggleSidebar}
        />
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">{t('物件管理', 'Property Management')}</h1>
              <p className="text-muted-foreground">{t('登録された物件の一覧', 'List of your registered properties')}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={handleCreateProperty}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('新規物件登録', 'Add New Property')}
              </Button>
            </div>
          </div>
        </div>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <FadeIn key={property.id} direction="up" duration={500}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="h-48 bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center">
                        <Building className="h-20 w-20 text-primary/40" />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle>{property.property_name}</CardTitle>
                        <CardDescription>
                          {getPropertyTypeLabel(property.property_type)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 pb-2">
                        <div className="flex items-start">
                          <MapPin className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
                          <span>{property.prefecture} {property.city} {property.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {property.year_built ? property.year_built + t('年建築', ' built') : t('建築年不明', 'Year unknown')}
                            </span>
                          </div>
                          <div className="text-sm">
                            {property.size} m²
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 border-t">
                        <div className="flex items-center">
                          <Yen className="mr-1 h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-600">
                            {formatPrice(property.price)}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => console.log('View details', property.id)}>
                          {t('詳細を見る', 'View Details')}
                        </Button>
                      </CardFooter>
                    </Card>
                  </FadeIn>
                ))}
              </div>
              
              {properties.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <Building className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">{t('物件がまだ登録されていません', 'No properties registered yet')}</h3>
                  <p className="text-muted-foreground mt-2 mb-6">
                    {t('新規物件登録ボタンをクリックして、最初の物件を登録しましょう。', 'Click the Add New Property button to register your first property.')}
                  </p>
                  <Button onClick={handleCreateProperty}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {t('新規物件登録', 'Add New Property')}
                  </Button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Properties;
