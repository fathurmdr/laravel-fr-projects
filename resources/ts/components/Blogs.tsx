import { Link } from '@inertiajs/react';
import { HiOutlineArrowSmRight } from 'react-icons/hi';
import { Blog as BlogTypes } from '@/interface/Inertia';
import BlogCard from '@/components/BlogCard';

interface BlogProps {
  blogs: BlogTypes[];
}
export default function Blogs({ blogs }: BlogProps) {
  return (
    <section id="blogs" className="min-h-screen bg-white-2 pb-16 pt-28 ">
      <div className="container">
        <div className="w-full px-4">
          <div className="mx-auto mb-8 max-w-xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-secondary  sm:text-4xl lg:text-5xl">
              Awesome Blogs
            </h2>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="flex w-full flex-wrap items-stretch justify-center gap-x-4 gap-y-8 pb-6 pt-8"
        >
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} className="max-w-[300px]" />
          ))}
        </div>
        <div className="mb-6 flex justify-end px-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-lg transition-all duration-500 ease-in-out hover:text-dark"
          >
            VIEW ALL POST <HiOutlineArrowSmRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
