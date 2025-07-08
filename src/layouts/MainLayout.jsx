import { Outlet } from 'react-router';
import Navbar from '../components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Footer';
const MainLayout = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="pt-18 min-h-[calc(100vh-68px)] bg-main-500">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
