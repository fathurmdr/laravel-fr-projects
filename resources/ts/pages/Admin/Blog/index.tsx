import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import route from 'ziggy-js';
import { AxiosResponse } from 'axios';
import { InertiaProps, Blog } from '@/interface/Inertia';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import AdminLayout from '@/layouts/AdminLayout';
import Pagination from '@/components/Admin/Pagination';
import { PaginationData } from '@/interface/pagination';
import api from '@/api/axios';
import PrimaryButton from '@/components/PrimaryButton';
import Spinner from '@/components/Spinner';
import BlogCard from '@/components/BlogCard';

function BlogPage({ auth }: InertiaProps) {
  const [blogs, setBlogs] = useState<PaginationData<Blog> | null>(null);
  const [loading, setLoading] = useState(true);

  const onChangePagination = ({ url }: { url: string }) => {
    if (url) {
      setLoading(true);
      api
        .get(url)
        .then((result: AxiosResponse<PaginationData<Blog>>) => {
          setBlogs(result.data);
        })
        .finally(() => setLoading(false));
    }
  };

  const onDelete = async (id: number) => {
    console.log(route('blog.destroy', id));

    await api.delete(route('blog.destroy', id));

    setLoading(true);
    api
      .get('/blog/list?page=1')
      .then((result: AxiosResponse<PaginationData<Blog>>) => {
        setBlogs(result.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    api
      .get('/admin/blog/list?page=1')
      .then((result: AxiosResponse<PaginationData<Blog>>) => {
        setBlogs(result.data);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <AdminLayout user={auth.user}>
      <Head title="Blog" />
      <Breadcrumb pageName="Blog" />
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mb-6 mt-8 w-64 px-6.5 sm:px-7.5">
            <Link href={route('blog.create')}>
              <PrimaryButton className="font-semibold">
                Create Post
              </PrimaryButton>
            </Link>
          </div>
          <div className="mb-4.5 px-6.5 sm:px-7.5">
            {loading && (
              <div className="mb-5 p-4 text-center">
                <Spinner size="medium" />
              </div>
            )}
            <div className="mb-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {!loading &&
                blogs?.data.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} onDelete={onDelete} />
                ))}
            </div>
            <Pagination
              {...blogs}
              option_per_page={['12', '36', '72', '120']}
              onChangePagination={onChangePagination}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default BlogPage;
