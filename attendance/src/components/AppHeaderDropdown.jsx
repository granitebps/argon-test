import React from 'react';
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';

import avatar8 from '../assets/images/avatars/8.jpg';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('at');
    navigate('/', { replace: true });
  };

  const handleProfile = () => {
    navigate('/profile', { replace: true });
  };

  return (
    <CDropdown variant='nav-item'>
      <CDropdownToggle placement='bottom-end' className='py-0' caret={false}>
        <CAvatar src={avatar8} size='md' />
      </CDropdownToggle>
      <CDropdownMenu className='pt-0' placement='bottom-end'>
        <CDropdownHeader className='bg-light fw-semibold py-2'>Settings</CDropdownHeader>
        <CDropdownItem href='#' onClick={handleProfile}>
          <CIcon icon={cilUser} className='me-2' />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href='#' onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className='me-2' />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;