import React from 'react';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Attendance = React.lazy(() => import('./pages/Attendance'));

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/attendance', name: 'Attendance', element: Attendance },
];

export default routes;
