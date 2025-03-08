
import { useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ReservationCalendarProps {
  currentMonth: Date;
}

interface ReservationEvent {
  id: string;
  title: string;
  date: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}

// Demo data for reservations
const demoReservations: ReservationEvent[] = [
  {
    id: '1',
    title: '田中様 - Room 101',
    date: new Date(2023, new Date().getMonth(), 8),
    status: 'confirmed'
  },
  {
    id: '2',
    title: '鈴木様 - Room 205',
    date: new Date(2023, new Date().getMonth(), 12),
    status: 'pending'
  },
  {
    id: '3',
    title: '佐藤様 - Room 302',
    date: new Date(2023, new Date().getMonth(), 15),
    status: 'confirmed'
  },
  {
    id: '4',
    title: '伊藤様 - Room 110',
    date: new Date(2023, new Date().getMonth(), 20),
    status: 'cancelled'
  },
  {
    id: '5',
    title: '渡辺様 - Room 401',
    date: new Date(2023, new Date().getMonth(), 22),
    status: 'confirmed'
  },
];

const ReservationCalendar = ({ currentMonth }: ReservationCalendarProps) => {
  const { toast } = useToast();
  
  const handleDayClick = (day: number) => {
    toast({
      title: "日付が選択されました",
      description: `${currentMonth.getFullYear()}年${currentMonth.getMonth() + 1}月${day}日`,
    });
  };

  const calendar = useMemo(() => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    const days = [];
    const weeks = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    // Create weeks
    let week = [];
    for (let i = 0; i < days.length; i++) {
      week.push(days[i]);
      if (week.length === 7 || i === days.length - 1) {
        // Fill in the rest of the week if it's not complete
        while (week.length < 7) {
          week.push(null);
        }
        weeks.push(week);
        week = [];
      }
    }
    
    return weeks;
  }, [currentMonth]);

  // Get reservations for the current month
  const reservationsInMonth = useMemo(() => {
    return demoReservations.filter(reservation => 
      reservation.date.getMonth() === currentMonth.getMonth() &&
      reservation.date.getFullYear() === currentMonth.getFullYear()
    );
  }, [currentMonth]);

  const getReservationsForDay = (day: number) => {
    if (!day) return [];
    return reservationsInMonth.filter(reservation => 
      reservation.date.getDate() === day
    );
  };

  return (
    <div className="p-1 sm:p-2">
      <div className="grid grid-cols-7 gap-1 text-center">
        {['日', '月', '火', '水', '木', '金', '土'].map((dayName, index) => (
          <div 
            key={index} 
            className="p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {dayName}
          </div>
        ))}
        
        {calendar.map((week, weekIndex) => (
          week.map((day, dayIndex) => {
            const isToday = day && 
              new Date().getDate() === day && 
              new Date().getMonth() === currentMonth.getMonth() && 
              new Date().getFullYear() === currentMonth.getFullYear();
            
            const dayReservations = day ? getReservationsForDay(day) : [];
            
            return (
              <div 
                key={`${weekIndex}-${dayIndex}`} 
                className={`
                  min-h-24 border dark:border-slate-800 p-1 
                  ${day ? 'bg-white dark:bg-slate-900 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800' : 'bg-gray-50 dark:bg-slate-950'}
                  ${isToday ? 'ring-2 ring-primary ring-inset' : ''}
                `}
                onClick={() => day && handleDayClick(day)}
              >
                {day && (
                  <>
                    <div className={`text-right p-1 font-medium ${isToday ? 'text-primary' : ''}`}>
                      {day}
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayReservations.map(reservation => (
                        <div 
                          key={reservation.id}
                          className={`
                            text-xs p-1 rounded truncate
                            ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                              reservation.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}
                          `}
                        >
                          {reservation.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
};

export default ReservationCalendar;
