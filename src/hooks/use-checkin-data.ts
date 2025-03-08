
import { useState, useEffect } from 'react';

export interface CheckInItem {
  name: string;
  time: string;
  room: string;
}

export const useCheckInData = () => {
  const [checkIns, setCheckIns] = useState<CheckInItem[]>([
    { name: '佐藤 健太', time: '14:00', room: '203' },
    { name: '山田 優子', time: '15:30', room: '101' },
    { name: '鈴木 康介', time: '16:45', room: '304' },
  ]);

  // In a real app, you might fetch this data from an API
  useEffect(() => {
    // Example of how we might fetch data in a real application
    // const fetchCheckIns = async () => {
    //   try {
    //     const response = await fetch('/api/checkins');
    //     const data = await response.json();
    //     setCheckIns(data);
    //   } catch (error) {
    //     console.error('Error fetching check-ins:', error);
    //   }
    // };
    // 
    // fetchCheckIns();
  }, []);

  return { checkIns };
};
