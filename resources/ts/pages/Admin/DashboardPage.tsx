import { Head } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';
import { InertiaProps } from '@/interface/Inertia';

function DashboardPage({ auth }: InertiaProps) {
  return (
    <AdminLayout user={auth.user}>
      <Head title="Dashboard" />
      <div>DashboardPage</div>
    </AdminLayout>
  );
}

export default DashboardPage;
