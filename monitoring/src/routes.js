import React from 'react';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Attendance = React.lazy(() => import('./pages/Attendance'));
const Summary = React.lazy(() => import('./pages/Summary'));

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/attendance', name: 'Attendance', element: Attendance },
  { path: '/attendance-summary', name: 'Attendance Summary', element: Summary },
];

export default routes;
