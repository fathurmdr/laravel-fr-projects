import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import dayjs from 'dayjs';
import { InertiaProps } from '@/interface/Inertia';
import { codeBlockCopy, codeBlockReplace } from '@/utils/codeBlock';
import 'highlight.js/styles/github-dark.css';
import HeaderBlog from '@/components/HeaderBlog';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';

export default function BlogShowPage({
  blog,
  contact,
  social_media_list,
}: InertiaProps) {
  const contentSanitized = DOMPurify.sanitize(blog.content);

  useEffect(() => {
    codeBlockCopy();
    hljs.highlightAll();
  }, [blog]);

  return (
    <>
      <HeaderBlog />
      <section id="blog" className="bg-white-2">
        <div className="container px-6 pb-32 pt-16">
          <h1 className="mb-6 text-4xl font-light">{blog.title}</h1>
          <span className="mb-6 block">
            Posted on: {dayjs(blog.created_at).format('MMMM DD, YYYY')}
          </span>
          <img
            className="mb-8 w-full"
            src={`/uploads/${blog.cover_image}`}
            alt={blog.slug}
          />
          <div
            className="ck-content"
            dangerouslySetInnerHTML={{
              __html: codeBlockReplace(contentSanitized),
            }}
          />
        </div>
      </section>
      <BackToTop />
      <Footer contact={contact} socialMediaList={social_media_list} />
    </>
  );
}
