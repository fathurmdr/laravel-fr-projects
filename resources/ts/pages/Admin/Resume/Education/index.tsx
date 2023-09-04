import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import route from 'ziggy-js';
import { AxiosResponse } from 'axios';
import { InertiaProps, Education } from '@/interface/Inertia';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import AdminLayout from '@/layouts/AdminLayout';
import Table, { ColumnTypes } from '@/components/Admin/Table';
import Pagination from '@/components/Admin/Pagination';
import { PaginationData } from '@/interface/pagination';
import api from '@/api/axios';
import PrimaryButton from '@/components/PrimaryButton';

const urlBefore = [{ name: 'Education', url: '/admin/education' }];

function EducationPage({ auth }: InertiaProps) {
  const [education, setEducation] = useState<PaginationData<Education> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const onChangePagination = ({ url }: { url: string }) => {
    if (url) {
      setLoading(true);
      api
        .get(url)
        .then((result: AxiosResponse<PaginationData<Education>>) => {
          setEducation(result.data);
        })
        .finally(() => setLoading(false));
    }
  };

  const educationColumns: ColumnTypes<Education> = [
    {
      name: 'title',
      textAlign: 'left',
    },
    {
      name: 'action',
      width: '160px',
      textAlign: 'center',
      render: (_, record) => (
        <>
          <Link
            as="button"
            href={route('education.edit', record.id)}
            className="flex items-center justify-center"
          >
            Edit
          </Link>
          <span className="px-2">|</span>
          <Link
            as="button"
            href={route('education.destroy', record.id)}
            className="flex items-center justify-center"
            onFinish={() => {
              setLoading(true);
              api
                .get('education/list?page=1')
                .then((result: AxiosResponse<PaginationData<Education>>) => {
                  setEducation(result.data);
                })
                .finally(() => setLoading(false));
            }}
            method="delete"
          >
            Delete
          </Link>
        </>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    api
      .get('education/list?page=1')
      .then((result: AxiosResponse<PaginationData<Education>>) => {
        setEducation(result.data);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <AdminLayout user={auth.user}>
      <Head title="Education" />
      <Breadcrumb pageName="Education" urlBefore={urlBefore} />
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-8 w-64 px-6.5 sm:px-7.5">
            <Link href={route('education.create')}>
              <PrimaryButton className="font-semibold">
                Add Education
              </PrimaryButton>
            </Link>
          </div>
          <div className="mb-4.5">
            <Table
              columns={educationColumns}
              data={education?.data || []}
              loading={loading}
            />
            <Pagination
              {...education}
              onChangePagination={onChangePagination}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default EducationPage;
