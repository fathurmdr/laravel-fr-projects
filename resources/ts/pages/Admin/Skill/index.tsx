import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import route from 'ziggy-js';
import { AxiosResponse } from 'axios';
import { InertiaProps, Skill } from '@/interface/Inertia';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import AdminLayout from '@/layouts/AdminLayout';
import Table, { ColumnTypes } from '@/components/Admin/Table';
import Pagination from '@/components/Admin/Pagination';
import { PaginationData } from '@/interface/pagination';
import api from '@/api/axios';
import PrimaryButton from '@/components/PrimaryButton';

function SkillsPage({ auth }: InertiaProps) {
  const [skills, setSkills] = useState<PaginationData<Skill> | null>(null);
  const [loading, setLoading] = useState(true);

  const onChangePagination = ({ url }: { url: string }) => {
    if (url) {
      setLoading(true);
      api
        .get(url)
        .then((result: AxiosResponse<PaginationData<Skill>>) => {
          setSkills(result.data);
        })
        .finally(() => setLoading(false));
    }
  };

  const skillColumns: ColumnTypes<Skill> = [
    {
      name: 'title',
      width: '200px',
      textAlign: 'left',
    },
    {
      name: 'icon',
      width: '200px',
      textAlign: 'left',
      render: (text) => <img className="w-12" src={`/uploads/${text}`} />,
    },
    {
      name: 'action',
      width: '160px',
      textAlign: 'center',
      render: (_, record) => (
        <>
          <Link
            as="button"
            href={route('skill.edit', record.id)}
            className="flex items-center justify-center"
          >
            Edit
          </Link>
          <span className="px-2">|</span>
          <Link
            as="button"
            href={route('skill.destroy', record.id)}
            className="flex items-center justify-center"
            onFinish={() => {
              setLoading(true);
              api
                .get('skill/list?page=1')
                .then((result: AxiosResponse<PaginationData<Skill>>) => {
                  setSkills(result.data);
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
      .get('skill/list?page=1')
      .then((result: AxiosResponse<PaginationData<Skill>>) => {
        setSkills(result.data);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <AdminLayout user={auth.user}>
      <Head title="Skill" />
      <Breadcrumb pageName="Skill" />
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-8 w-64 px-6.5 sm:px-7.5">
            <Link href={route('skill.create')}>
              <PrimaryButton className="font-semibold">Add Skill</PrimaryButton>
            </Link>
          </div>
          <div className="mb-4.5">
            <Table
              columns={skillColumns}
              data={skills?.data || []}
              loading={loading}
            />
            <Pagination {...skills} onChangePagination={onChangePagination} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default SkillsPage;
