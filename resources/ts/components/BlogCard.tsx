import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import route from 'ziggy-js';
import { HiOutlineArrowSmRight, HiPencilAlt, HiTrash } from 'react-icons/hi';
import { Blog } from '@/interface/Inertia';

interface BlogCardProps {
  blog: Blog;
  className?: string;
  onDelete?: (id: number) => void;
}

export default function BlogCard({ blog, className, onDelete }: BlogCardProps) {
  const { url } = usePage();
  return (
    <div
      className={`relative flex min-h-[420px] flex-col overflow-hidden rounded-lg border border-stroke bg-white transition-all duration-500 ease-in-out hover:-rotate-1 hover:shadow-md dark:border-strokedark dark:bg-boxdark dark:hover:shadow-graydark ${className}`}
    >
      {url.includes('admin/blog') && (
        <div className="absolute right-2.5 top-2.5 z-10 flex gap-2">
          <Link
            as="button"
            href={route('blog.edit', blog.id)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-all duration-500 ease-in-out hover:bg-graydark hover:text-whiter"
          >
            <HiPencilAlt className="text-lg" />
          </Link>
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-all duration-500 ease-in-out hover:bg-graydark hover:text-whiter"
            onClick={() => {
              onDelete && onDelete(blog.id);
            }}
          >
            <HiTrash className="text-lg" />
          </button>
        </div>
      )}
      <img
        className="block min-h-[200px] w-full object-cover"
        src={`/uploads/${blog.cover_image}`}
        alt={blog.title}
      />
      <div className="flex h-full flex-col px-4 py-6 text-black dark:text-white">
        <h4 className="mb-2 text-lg font-light">{blog.title}</h4>
        <h6 className="mb-4 text-xs font-normal">
          Posted on: {dayjs(blog.created_at).format('MMMM DD, YYYY')}
        </h6>
        <Link
          href={`/blog/${blog.slug}`}
          className="mb-1 mt-auto inline-flex items-center gap-1 pt-5 text-xs font-medium uppercase transition-all duration-500 ease-in-out hover:text-dark"
        >
          View The Post <HiOutlineArrowSmRight className="text-lg" />
        </Link>
      </div>
    </div>
  );
}
