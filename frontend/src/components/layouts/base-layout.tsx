import React, { ReactNode, useState } from 'react';
import Sidebar from '@/components/layouts/sidebar';
import Navbar from '@/components/layouts/navbar';
import Footer from '@/components/layouts/footer';
import { CardProfile } from '@/components/ui/cardGeneral/cardProfile/cardProfile';

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const handleUsernameClick = () => {
    setIsProfileVisible(true);
  };

  const handleProfileClose = () => {
    setIsProfileVisible(false);
  };

  return (
    <div className="base-layout">
      <div className="layout-sidebar">
        <Sidebar />
      </div>
      <div className="main-content" style={{ backgroundColor: '#201C1E' }}>
        <div className="layout-navbar">
          <Navbar onUsernameClick={handleUsernameClick} />
        </div>
        <main>{children}{isProfileVisible && <CardProfile onClose={handleProfileClose} />}</main>
        <div className="layout-footer">
          <Footer />
        </div>
        
      </div>
    </div>
  );
};

export default BaseLayout;