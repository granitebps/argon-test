import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilCalendar, cilClock, cilSpeedometer, cilUser } from '@coreui/icons';
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
    name: 'Attendance',
    to: '/attendance',
    icon: <CIcon icon={cilClock} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Summary Attendance',
    to: '/attendance-summary',
    icon: <CIcon icon={cilCalendar} customClassName='nav-icon' />,
  },
];

export default _nav;
