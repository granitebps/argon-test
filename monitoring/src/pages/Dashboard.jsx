import React from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const authToken = localStorage.getItem('mat');
  if (!authToken) {
    return <Navigate replace to='/' />;
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
