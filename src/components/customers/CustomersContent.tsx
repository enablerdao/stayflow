
import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CustomerList from './CustomerList';
import FadeIn from '@/components/animations/FadeIn';
import { Search, UserPlus } from 'lucide-react';

const CustomersContent = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6">
      <FadeIn direction="up" duration={500}>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h1 className="text-2xl font-bold tracking-tight">
              {t('お客様管理', 'Customer Management')}
            </h1>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t('お客様を検索...', 'Search customers...')}
                  className="w-full pl-8 sm:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="hidden sm:flex">
                <UserPlus className="mr-2 h-4 w-4" />
                {t('新規登録', 'Add New')}
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="px-5 py-4">
              <CardTitle className="text-lg">{t('お客様一覧', 'Customer List')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerList searchTerm={searchTerm} />
            </CardContent>
          </Card>
        </div>
      </FadeIn>
    </main>
  );
};

export default CustomersContent;
