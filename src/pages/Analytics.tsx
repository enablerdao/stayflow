
import React from 'react';
import { useLanguage } from '@/hooks/use-language';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { useMobileView } from '@/hooks/use-mobile';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analytics = () => {
  const { t } = useLanguage();
  const { isMobileView, sidebarOpen, toggleSidebar } = useMobileView();

  // Sample data for the analytics
  const monthlyRevenueData = [
    { name: '1月', revenue: 4000, occupancy: 80 },
    { name: '2月', revenue: 3000, occupancy: 70 },
    { name: '3月', revenue: 5000, occupancy: 90 },
    { name: '4月', revenue: 2780, occupancy: 65 },
    { name: '5月', revenue: 1890, occupancy: 50 },
    { name: '6月', revenue: 2390, occupancy: 60 },
    { name: '7月', revenue: 3490, occupancy: 75 },
    { name: '8月', revenue: 4000, occupancy: 85 },
    { name: '9月', revenue: 2780, occupancy: 65 },
    { name: '10月', revenue: 1890, occupancy: 55 },
    { name: '11月', revenue: 2390, occupancy: 60 },
    { name: '12月', revenue: 3490, occupancy: 78 },
  ];

  const customerSourceData = [
    { name: t('リピーター', 'Repeat Guests'), value: 40 },
    { name: t('直接予約', 'Direct Booking'), value: 30 },
    { name: t('エージェント', 'Agencies'), value: 20 },
    { name: t('OTA', 'OTAs'), value: 10 },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} mobileView={isMobileView} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          toggleMobileMenu={toggleSidebar}
          toggleSidebar={toggleSidebar}
        />
        <div className="p-4 md:p-6">
          <h1 className="text-2xl font-bold">{t('分析', 'Analytics')}</h1>
          <p className="text-muted-foreground">{t('物件のデータ分析を行います', 'Analyze your property data')}</p>
        </div>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <Tabs defaultValue="revenue">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="revenue">{t('収益', 'Revenue')}</TabsTrigger>
                <TabsTrigger value="customers">{t('顧客', 'Customers')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="revenue">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('月間収益と稼働率', 'Monthly Revenue & Occupancy')}</CardTitle>
                    <CardDescription>
                      {t('過去12ヶ月の収益と稼働率の推移', 'Revenue and occupancy trends over the past 12 months')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={monthlyRevenueData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Area 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="revenue" 
                            name={t('収益 (¥)', 'Revenue (¥)')}
                            stroke="#8884d8" 
                            fill="#8884d8" 
                          />
                          <Area 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="occupancy" 
                            name={t('稼働率 (%)', 'Occupancy (%)')}
                            stroke="#82ca9d" 
                            fill="#82ca9d" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="customers">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('顧客獲得チャネル', 'Customer Acquisition Channels')}</CardTitle>
                    <CardDescription>
                      {t('顧客がどのチャネルから来たかの内訳', 'Breakdown of where your customers are coming from')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={customerSourceData}
                          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar 
                            dataKey="value" 
                            name={t('顧客数', 'Customer Count')}
                            fill="#8884d8" 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
