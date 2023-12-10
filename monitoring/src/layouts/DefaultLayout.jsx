import React, { useState } from 'react';
import AppSidebar from '../components/AppSidebar';
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';

const DefaultLayout = () => {
  const [sidebarShow, setSidebarShow] = useState();

  return (
    <div>
      <AppSidebar sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} />
      <div className='wrapper d-flex flex-column min-vh-100 bg-light'>
        <AppHeader sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} />
        <div className='body flex-grow-1 px-3'>
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
