import React, { useState } from 'react';

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { AppSidebarNav } from './AppSidebarNav';

import { logoNegative } from '../assets/brand/logo-negative';
import { sygnet } from '../assets/brand/sygnet';

import SimpleBar from 'simplebar-react';
// import 'simplebar/dist/simplebar.min.css';
// import 'sim';

// sidebar nav config
import navigation from '../_nav';

const AppSidebar = ({ sidebarShow, setSidebarShow }) => {
  const [unfoldable, setUnfoldable] = useState();

  return (
    <CSidebar
      position='fixed'
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => setSidebarShow(visible)}
    >
      <CSidebarBrand className='d-none d-md-flex' to='/'>
        <CIcon className='sidebar-brand-full' icon={logoNegative} height={35} />
        <CIcon className='sidebar-brand-narrow' icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler className='d-none d-lg-flex' onClick={() => setUnfoldable((prevState) => !prevState)} />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
