import React from 'react';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Attendances = React.lazy(() => import('./pages/Attendances'));
const Users = React.lazy(() => import('./pages/Users'));
const UpdateUser = React.lazy(() => import('./pages/UpdateUser'));
const CreateUser = React.lazy(() => import('./pages/CreateUser'));

const NotFound = () => {
  return <h1>Not Found</h1>;
};

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/attendances', name: 'Attendances', element: Attendances },
  { path: '/users', name: 'Users', element: Users },
  { path: '/users-create', name: 'CreateUsers', element: CreateUser },
  { path: '/users/:id', name: 'UpdateUsers', element: UpdateUser },
  { path: '*', name: 'NotFound', element: NotFound },
];

export default routes;
