import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { InertiaProps } from '@/interface/Inertia';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import AdminLayout from '@/layouts/AdminLayout';

dayjs.extend(relativeTime);

const urlBefore = [{ name: 'Message', url: '/admin/message' }];

function ShowMessagePage({ auth, message }: InertiaProps) {
  return (
    <AdminLayout user={auth.user}>
      <Head title={`Message from ${message.name}`} />
      <Breadcrumb pageName={message.name} urlBefore={urlBefore} />
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mb-4.5 p-8">
            <div className="mb-2 flex justify-between">
              <div className="mb-4">
                <h1 className="font bold text-lg">Message From:</h1>
                <h2 className="font-semibold">{message.name}</h2>
                <a
                  href={`mailto:${message.email}`}
                  className="text-sm text-primary underline"
                >
                  {message.email}
                </a>
              </div>
              <small className="text-xs">
                {dayjs().diff(dayjs(message.created_at), 'd') < 7
                  ? dayjs(message.created_at).fromNow()
                  : dayjs(message.created_at).format('DD MMM YY')}
              </small>
            </div>
            <p className=" whitespace-pre-line text-justify text-sm">
              {message.message}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ShowMessagePage;
