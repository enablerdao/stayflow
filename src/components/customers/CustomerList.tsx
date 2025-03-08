
import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ChevronDown, 
  ChevronUp, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  Calendar 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

// Mock customer data
const customers = [
  {
    id: '1',
    name: '山田 太郎',
    email: 'yamada.taro@example.com',
    phone: '090-1234-5678',
    status: 'active',
    lastContact: '2023-09-15',
    nextReservation: '2023-10-22',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yamada'
  },
  {
    id: '2',
    name: '佐藤 花子',
    email: 'sato.hanako@example.com',
    phone: '080-8765-4321',
    status: 'new',
    lastContact: '2023-09-20',
    nextReservation: null,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sato'
  },
  {
    id: '3',
    name: '鈴木 一郎',
    email: 'suzuki.ichiro@example.com',
    phone: '070-2345-6789',
    status: 'active',
    lastContact: '2023-09-10',
    nextReservation: '2023-10-05',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suzuki'
  },
  {
    id: '4',
    name: '田中 美咲',
    email: 'tanaka.misaki@example.com',
    phone: '090-3456-7890',
    status: 'inactive',
    lastContact: '2023-08-25',
    nextReservation: null,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanaka'
  },
  {
    id: '5',
    name: '伊藤 健太',
    email: 'ito.kenta@example.com',
    phone: '080-4567-8901',
    status: 'active',
    lastContact: '2023-09-18',
    nextReservation: '2023-10-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ito'
  },
];

type CustomerStatus = 'active' | 'inactive' | 'new';

const statusColors: Record<CustomerStatus, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
};

const statusTranslations = {
  active: { ja: 'アクティブ', en: 'Active' },
  inactive: { ja: '非アクティブ', en: 'Inactive' },
  new: { ja: '新規', en: 'New' },
};

interface CustomerListProps {
  searchTerm: string;
}

const CustomerList = ({ searchTerm }: CustomerListProps) => {
  const { t, language } = useLanguage();
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phone.includes(searchTerm)
    );
  });

  const toggleExpand = (customerId: string) => {
    if (expandedCustomer === customerId) {
      setExpandedCustomer(null);
    } else {
      setExpandedCustomer(customerId);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]"></TableHead>
            <TableHead className="w-[250px]">{t('お客様', 'Customer')}</TableHead>
            <TableHead className="hidden md:table-cell">{t('状態', 'Status')}</TableHead>
            <TableHead className="hidden lg:table-cell">{t('最終連絡', 'Last Contact')}</TableHead>
            <TableHead className="hidden lg:table-cell">{t('次回予約', 'Next Reservation')}</TableHead>
            <TableHead className="w-[100px] text-right">{t('アクション', 'Actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                {t('お客様が見つかりませんでした。', 'No customers found.')}
              </TableCell>
            </TableRow>
          ) : (
            filteredCustomers.map((customer) => (
              <>
                <TableRow key={customer.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => toggleExpand(customer.id)}
                    >
                      {expandedCustomer === customer.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      <span className="sr-only">{t('詳細を表示', 'Toggle details')}</span>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar} alt={customer.name} />
                        <AvatarFallback>{customer.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className={statusColors[customer.status as CustomerStatus]}>
                      {language === 'ja' 
                        ? statusTranslations[customer.status as CustomerStatus].ja 
                        : statusTranslations[customer.status as CustomerStatus].en}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {customer.lastContact ? (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.lastContact}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {customer.nextReservation ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{customer.nextReservation}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">{t('アクション', 'Actions')}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/messages?customer=${customer.id}`}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            {t('メッセージを送信', 'Send Message')}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          {t('メールを送信', 'Send Email')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          {t('電話をかける', 'Call')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                {expandedCustomer === customer.id && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={6} className="p-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <h3 className="font-medium text-sm">{t('連絡先情報', 'Contact Information')}</h3>
                          <div className="mt-2 grid gap-1">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{t('予約履歴', 'Booking History')}</h3>
                          <div className="mt-2 text-sm text-muted-foreground">
                            {t('直近の予約はありません。', 'No recent bookings.')}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{t('クイックアクション', 'Quick Actions')}</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                              {t('メッセージ', 'Message')}
                            </Button>
                            <Button size="sm" variant="outline">
                              <Calendar className="mr-1.5 h-3.5 w-3.5" />
                              {t('予約追加', 'Add Booking')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerList;
