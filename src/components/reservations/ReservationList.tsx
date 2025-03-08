
import { useState, useMemo } from 'react';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  ChevronDown, 
  ChevronUp,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

interface ReservationListProps {
  searchQuery: string;
}

interface Reservation {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: Date;
  checkOut: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
  guestCount: number;
  contactInfo: string;
  notes?: string;
}

// Demo data
const demoReservations: Reservation[] = [
  {
    id: '1001',
    guestName: '田中 太郎',
    roomNumber: '101',
    checkIn: new Date(2023, new Date().getMonth(), 8),
    checkOut: new Date(2023, new Date().getMonth(), 10),
    status: 'confirmed',
    guestCount: 2,
    contactInfo: 'tanaka@example.com',
    notes: '早めのチェックインを希望'
  },
  {
    id: '1002',
    guestName: '鈴木 花子',
    roomNumber: '205',
    checkIn: new Date(2023, new Date().getMonth(), 12),
    checkOut: new Date(2023, new Date().getMonth(), 15),
    status: 'pending',
    guestCount: 1,
    contactInfo: '090-1234-5678',
  },
  {
    id: '1003',
    guestName: '佐藤 健',
    roomNumber: '302',
    checkIn: new Date(2023, new Date().getMonth(), 15),
    checkOut: new Date(2023, new Date().getMonth(), 20),
    status: 'confirmed',
    guestCount: 3,
    contactInfo: 'sato@example.com',
    notes: '子供1人同伴、アレルギー有'
  },
  {
    id: '1004',
    guestName: '伊藤 美咲',
    roomNumber: '110',
    checkIn: new Date(2023, new Date().getMonth(), 20),
    checkOut: new Date(2023, new Date().getMonth(), 22),
    status: 'cancelled',
    guestCount: 2,
    contactInfo: 'ito@example.com',
  },
  {
    id: '1005',
    guestName: '渡辺 一郎',
    roomNumber: '401',
    checkIn: new Date(2023, new Date().getMonth(), 22),
    checkOut: new Date(2023, new Date().getMonth(), 25),
    status: 'confirmed',
    guestCount: 4,
    contactInfo: '090-9876-5432',
    notes: '荷物を事前に預かる予定'
  },
  {
    id: '1006',
    guestName: '山田 優子',
    roomNumber: '203',
    checkIn: new Date(2023, new Date().getMonth(), 25),
    checkOut: new Date(2023, new Date().getMonth(), 28),
    status: 'pending',
    guestCount: 2,
    contactInfo: 'yamada@example.com',
  },
  {
    id: '1007',
    guestName: '中村 修',
    roomNumber: '305',
    checkIn: new Date(2023, new Date().getMonth() + 1, 1),
    checkOut: new Date(2023, new Date().getMonth() + 1, 5),
    status: 'confirmed',
    guestCount: 1,
    contactInfo: '090-1122-3344',
  },
];

const ReservationList = ({ searchQuery }: ReservationListProps) => {
  const { toast } = useToast();
  const [sortField, setSortField] = useState<keyof Reservation>('checkIn');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSort = (field: keyof Reservation) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleDetails = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAction = (action: string, id: string) => {
    toast({
      title: `アクション: ${action}`,
      description: `予約ID: ${id} に対する${action}アクションが実行されました。`,
    });
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  const filteredReservations = useMemo(() => {
    if (!searchQuery) return demoReservations;
    
    const query = searchQuery.toLowerCase();
    return demoReservations.filter(reservation => 
      reservation.guestName.toLowerCase().includes(query) ||
      reservation.roomNumber.toLowerCase().includes(query) ||
      reservation.id.toLowerCase().includes(query) ||
      reservation.contactInfo.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const sortedReservations = useMemo(() => {
    return [...filteredReservations].sort((a, b) => {
      if (sortField === 'checkIn' || sortField === 'checkOut') {
        const aValue = a[sortField].getTime();
        const bValue = b[sortField].getTime();
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        const aValue = String(a[sortField]).toLowerCase();
        const bValue = String(b[sortField]).toLowerCase();
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
    });
  }, [filteredReservations, sortField, sortDirection]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '確定';
      case 'pending':
        return '保留中';
      case 'cancelled':
        return 'キャンセル';
      default:
        return status;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b dark:border-slate-800">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('guestName')}
              >
                ゲスト名
                {sortField === 'guestName' && (
                  sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('roomNumber')}
              >
                部屋番号
                {sortField === 'roomNumber' && (
                  sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('checkIn')}
              >
                チェックイン
                {sortField === 'checkIn' && (
                  sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('checkOut')}
              >
                チェックアウト
                {sortField === 'checkOut' && (
                  sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('status')}
              >
                ステータス
                {sortField === 'status' && (
                  sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              アクション
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedReservations.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                予約が見つかりませんでした
              </td>
            </tr>
          ) : (
            sortedReservations.map(reservation => (
              <>
                <tr 
                  key={reservation.id}
                  className="border-b dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-4 text-sm">
                    <div className="font-medium">{reservation.guestName}</div>
                    <div className="text-gray-500 dark:text-gray-400">{reservation.contactInfo}</div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {reservation.roomNumber}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {formatDate(reservation.checkIn)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {formatDate(reservation.checkOut)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center">
                      {getStatusIcon(reservation.status)}
                      <span className="ml-1.5">{getStatusText(reservation.status)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleDetails(reservation.id)}
                      >
                        {expandedId === reservation.id ? '閉じる' : '詳細'}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAction('編集', reservation.id)}>
                            編集
                          </DropdownMenuItem>
                          {reservation.status !== 'confirmed' && (
                            <DropdownMenuItem onClick={() => handleAction('確定', reservation.id)}>
                              予約確定
                            </DropdownMenuItem>
                          )}
                          {reservation.status !== 'cancelled' && (
                            <DropdownMenuItem onClick={() => handleAction('キャンセル', reservation.id)}>
                              キャンセル
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleAction('削除', reservation.id)}>
                            削除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
                {expandedId === reservation.id && (
                  <tr className="bg-gray-50 dark:bg-slate-800/50">
                    <td colSpan={6} className="px-4 py-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">ゲスト数</p>
                          <p className="text-sm">{reservation.guestCount}名</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">滞在日数</p>
                          <p className="text-sm">
                            {Math.ceil((reservation.checkOut.getTime() - reservation.checkIn.getTime()) / (1000 * 60 * 60 * 24))}日間
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">予約ID</p>
                          <p className="text-sm">{reservation.id}</p>
                        </div>
                        {reservation.notes && (
                          <div className="md:col-span-3">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">備考</p>
                            <p className="text-sm">{reservation.notes}</p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
