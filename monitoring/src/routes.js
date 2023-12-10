import React from 'react';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Attendances = React.lazy(() => import('./pages/Attendances'));
const Users = React.lazy(() => import('./pages/Users'));
const UpdateUser = React.lazy(() => import('./pages/UpdateUser'));

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/attendances', name: 'Attendances', element: Attendances },
  { path: '/users', name: 'Users', element: Users },
  { path: '/users/:id', name: 'UpdateUsers', element: UpdateUser },
];

export default routes;
