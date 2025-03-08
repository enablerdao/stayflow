
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import WelcomeScreen from '@/components/dashboard/WelcomeScreen';
import DashboardContent from '@/components/dashboard/DashboardContent';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [userName, setUserName] = useState('ゲスト');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedDashboard');
    if (hasVisitedBefore) {
      setFirstVisit(false);
    } else {
      localStorage.setItem('hasVisitedDashboard', 'true');
      
      const timer = setTimeout(() => {
        setFirstVisit(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissWelcomeScreen = () => {
    setFirstVisit(false);
  };

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
        <Header toggleMobileMenu={toggleMobileMenu} />

        {firstVisit && (
          <WelcomeScreen userName={userName} dismissWelcomeScreen={dismissWelcomeScreen} />
        )}

        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
