import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from '../pages/NotFound';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));

export default function NavigateTo() {
  return (
    <Suspense>
      <Routes>
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
