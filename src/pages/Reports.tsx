
import React from 'react';
import { useLanguage } from '@/hooks/use-language';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { useMobileView } from '@/hooks/use-mobile';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Reports = () => {
  const { t } = useLanguage();
  const { isMobileView, sidebarOpen, toggleSidebar } = useMobileView();

  // Sample data for the reports
  const reportsData = [
    { id: 1, name: t('予約レポート', 'Reservation Report'), updated: '2023-10-15', type: 'PDF' },
    { id: 2, name: t('収益レポート', 'Revenue Report'), updated: '2023-10-14', type: 'CSV' },
    { id: 3, name: t('顧客アンケート', 'Customer Survey'), updated: '2023-10-10', type: 'PDF' },
    { id: 4, name: t('マーケティングレポート', 'Marketing Report'), updated: '2023-10-05', type: 'XLSX' },
    { id: 5, name: t('稼働率レポート', 'Occupancy Report'), updated: '2023-10-01', type: 'PDF' },
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
          <h1 className="text-2xl font-bold">{t('レポート', 'Reports')}</h1>
          <p className="text-muted-foreground">{t('物件のレポートを管理します', 'Manage your property reports')}</p>
        </div>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('最近のレポート', 'Recent Reports')}</CardTitle>
                <CardDescription>
                  {t('物件に関する最近のレポート一覧', 'A list of your recent property reports')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>{t('利用可能なレポートの一覧', 'A list of available reports')}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">{t('ID', 'ID')}</TableHead>
                      <TableHead>{t('レポート名', 'Report Name')}</TableHead>
                      <TableHead>{t('更新日', 'Updated Date')}</TableHead>
                      <TableHead className="text-right">{t('タイプ', 'Type')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportsData.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{report.updated}</TableCell>
                        <TableCell className="text-right">{report.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
