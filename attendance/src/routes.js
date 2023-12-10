import React from 'react';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const routes = [{ path: '/dashboard', name: 'Dashboard', element: Dashboard }];

export default routes;
