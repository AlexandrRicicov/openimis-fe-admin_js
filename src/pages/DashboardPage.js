import React from 'react';
import { useSelector } from 'react-redux';

import AdminAndInspectorDashboard from '../components/dashboard/AdminAndInspectorDashboard';
import EmployerDashboard from '../components/dashboard/EmployerDashboard';
import { ADMIN_RIGHT, INSPECTOR_RIGHT } from '../constants';

function DashboardPage() {
  const rights = useSelector((state) => state.core?.user?.i_user?.rights ?? []);
  const isAdminOrInspector = rights.includes(INSPECTOR_RIGHT) || rights.includes(ADMIN_RIGHT);

  if (isAdminOrInspector) {
    return <AdminAndInspectorDashboard />;
  }

  return <EmployerDashboard />;
}

export default DashboardPage;
