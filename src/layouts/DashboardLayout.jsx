import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Sidebar - fixed on desktop, overlay on mobile */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto md:ml-64">
        {/* Add some padding to prevent content from being hidden under fixed header on mobile */}
        <div className="pt-16 md:pt-0 p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
