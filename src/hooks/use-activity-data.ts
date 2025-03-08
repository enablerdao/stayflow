
import { useState, useEffect } from 'react';

export interface ActivityItem {
  action: string;
  user: string;
  time: string;
  status: string;
  statusColor: 'green' | 'yellow' | 'red';
}

export const useActivityData = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      action: '予約が作成されました',
      user: '田中 誠',
      time: '25分前',
      status: '完了',
      statusColor: 'green',
    },
    {
      action: 'ルームサービス リクエスト',
      user: '鈴木 美咲',
      time: '1時間前',
      status: '進行中',
      statusColor: 'yellow',
    },
    {
      action: 'お客様チェックアウト',
      user: '佐々木 隆',
      time: '3時間前',
      status: '完了',
      statusColor: 'green',
    },
    {
      action: '予約がキャンセルされました',
      user: '高橋 直子',
      time: '5時間前',
      status: 'キャンセル',
      statusColor: 'red',
    },
  ]);

  // In a real app, you might fetch this data from an API
  useEffect(() => {
    // Example of how we might fetch data in a real application
    // const fetchActivities = async () => {
    //   try {
    //     const response = await fetch('/api/activities');
    //     const data = await response.json();
    //     setActivities(data);
    //   } catch (error) {
    //     console.error('Error fetching activities:', error);
    //   }
    // };
    // 
    // fetchActivities();
  }, []);

  return { activities };
};
