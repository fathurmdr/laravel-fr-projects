import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { Blog, InertiaProps } from '@/interface/Inertia';
import { PaginationData } from '@/interface/pagination';
import HeaderBlog from '@/components/HeaderBlog';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import api from '@/api/axios';
import Spinner from '@/components/Spinner';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Admin/Pagination';

export default function BlogPage({ contact, social_media_list }: InertiaProps) {
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

  useEffect(() => {
    setLoading(true);
    api
      .get('/blog/list?page=1')
      .then((result: AxiosResponse<PaginationData<Blog>>) => {
        setBlogs(result.data);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <HeaderBlog />
      <section id="blog" className="bg-white-2">
        <div className="container min-h-screen px-6 pb-32 pt-16">
          {loading && (
            <div className="mb-5 p-4 text-center">
              <Spinner size="medium" />
            </div>
          )}
          <div className="mb-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {!loading &&
              blogs?.data.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
          </div>
          <Pagination
            {...blogs}
            option_per_page={['12', '36', '72', '120']}
            onChangePagination={onChangePagination}
          />
        </div>
      </section>
      <BackToTop />
      <Footer contact={contact} socialMediaList={social_media_list} />
    </>
  );
}
