import React from 'react';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
];

export default routes;
