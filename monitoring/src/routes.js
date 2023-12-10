import React from 'react';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Attendances = React.lazy(() => import('./pages/Attendances'));

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/attendances', name: 'Attendances', element: Attendances },
];

export default routes;
