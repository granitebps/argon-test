import React from 'react';
import { NavLink } from 'react-router-dom';
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CHeaderToggler, CNavLink, CNavItem } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';

import AppHeaderDropdown from './AppHeaderDropdown';
import { logo } from '../assets/brand/logo';

const AppHeader = ({ sidebarShow, setSidebarShow }) => {
  return (
    <CHeader position='sticky' className='mb-4'>
      <CContainer fluid>
        <CHeaderToggler className='ps-1' onClick={() => setSidebarShow((prevState) => !prevState)}>
          <CIcon icon={cilMenu} size='lg' />
        </CHeaderToggler>
        <CHeaderBrand className='mx-auto d-md-none' to='/'>
          <CIcon icon={logo} height={48} alt='Logo' />
        </CHeaderBrand>
        <CHeaderNav className='d-none d-md-flex me-auto'>
          <CNavItem>
            <CNavLink to='/dashboard' component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className='ms-3'>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
