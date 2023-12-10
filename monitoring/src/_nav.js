import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilClock, cilSpeedometer, cilUser, cilPeople } from '@coreui/icons';
import { CNavItem } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Attendances',
    to: '/attendances',
    icon: <CIcon icon={cilClock} customClassName='nav-icon' />,
  },
];

export default _nav;
