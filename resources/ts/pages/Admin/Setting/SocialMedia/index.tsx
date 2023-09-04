import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import route from 'ziggy-js';
import { AxiosResponse } from 'axios';
import AdminLayout from '@/layouts/AdminLayout';
import { InertiaProps, SocialMedia } from '@/interface/Inertia';
import api from '@/api/axios';
import Table, { ColumnTypes } from '@/components/Admin/Table';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import { PaginationData } from '@/interface/pagination';
import Pagination from '@/components/Admin/Pagination';

const socialMediaColumns: ColumnTypes<SocialMedia> = [
  {
    name: 'platform',
    width: '200px',
    textAlign: 'left',
    render: (text) => (
      <div className="flex items-center gap-4">
        <img src={'/icons/' + text + '.png'} alt={text} className="w-8" />
        <span className="font-semibold">{text}</span>
      </div>
    ),
  },
  {
    name: 'url',
    render: (text) => (
      <a className="cursor-pointer" href={text} target="_blank">
        {text}
      </a>
    ),
  },
  {
    name: 'action',
    width: '120px',
    textAlign: 'center',
    render: (_, record) => (
      <Link
        href={route('social_media.edit', record.id)}
        className="flex items-center justify-center"
      >
        Edit
      </Link>
    ),
  },
];

function SocialMediaPage({ auth }: InertiaProps) {
  const [socialMediaList, setSocialMediaList] =
    useState<PaginationData<SocialMedia> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get('social_media/list?page=1')
      .then((result: AxiosResponse<PaginationData<SocialMedia>>) => {
        setSocialMediaList(result.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangePagination = ({ url }: { url: string }) => {
    if (url) {
      setLoading(true);
      api
        .get(url)
        .then((result: AxiosResponse<PaginationData<SocialMedia>>) => {
          setSocialMediaList(result.data);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <AdminLayout user={auth.user}>
      <Head title="Social Media" />
      <Breadcrumb pageName="Social Media" />
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mb-4.5">
            <Table
              columns={socialMediaColumns}
              data={socialMediaList?.data || []}
              loading={loading}
            />
            <Pagination
              {...socialMediaList}
              onChangePagination={onChangePagination}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default SocialMediaPage;
