import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";
import { USER_ROLE } from '../utils/role';

import { CustomerRoutes } from './customer.routes';
import { AdminRoutes } from './admin.routes';
import { SaleRoutes } from './sale.routes';
import { AuthRoutes } from './auth.routes';
import { useEffect } from 'react';
import { api } from '../services/api';

export function Routes() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api.get('/users/validated')
      .catch(() => signOut())
  }, [])

  function AccessRoute() {
    switch (user.role) {
      case USER_ROLE.ADMIN:
        return <AdminRoutes />
      case USER_ROLE.CUSTOMER:
        return <CustomerRoutes />
      case USER_ROLE.SALE:
        return <SaleRoutes />
      default: <CustomerRoutes />
    }
  }

  return (
    <BrowserRouter>
      {user ? <AccessRoute /> : <AuthRoutes />}
    </BrowserRouter>
  );
}