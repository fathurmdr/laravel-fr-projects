import { FocusEvent, FormEvent } from 'react';
import { AxiosResponse } from 'axios';
import { Head, useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import { InertiaProps } from '@/interface/Inertia';
import AdminLayout from '@/layouts/AdminLayout';
import TextEditor from '@/components/TextEditor';
import TextInput from '@/components/TextInput';
import ImageUpload from '@/components/ImageUpload';
import Form from '@/components/Form';
import PrimaryButton from '@/components/PrimaryButton';
import api from '@/api/axios';

const urlBefore = [{ name: 'Blog', url: '/admin/blog' }];

function CreateBlogPage({ auth }: InertiaProps) {
  const { data, setData, post, processing, errors } = useForm<{
    title: string;
    slug: string;
    cover_image: File | null;
    content: string;
  }>({
    title: '',
    slug: '',
    cover_image: null,
    content: '',
  });

  const onBlurTitle = async (e: FocusEvent<HTMLInputElement, Element>) => {
    const title = e.target.value;
    if (title) {
      await api
        .get(`/admin/blog/create-slug?title=${title}`)
        .then((result: AxiosResponse<{ slug: string }>) => {
          const slug = result.data.slug;
          setData('slug', slug);
        });
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('blog.store'));
  };
  return (
    <AdminLayout user={auth.user}>
      <Head title="Create Post" />
      <Breadcrumb pageName="Create Post" urlBefore={urlBefore} />
      <div className="w-full">
        <Form onSubmit={submit}>
          <div className="mb-4.5">
            <TextInput
              label="Title"
              id="title"
              name="title"
              type="text"
              placeholder="Enter Blog Title"
              errorMessage={errors.title}
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              onBlur={onBlurTitle}
            />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Slug"
              id="slug"
              name="slug"
              type="text"
              placeholder="Enter Blog slug"
              errorMessage={errors.slug}
              value={data.slug}
              onChange={(e) => setData('slug', e.target.value)}
            />
          </div>
          <div className="mb-4.5">
            <ImageUpload
              label="Cover Photo"
              coverClass="w-full"
              errorMessage={errors.cover_image}
              image={data.cover_image}
              setImage={(cover_image) => setData('cover_image', cover_image)}
            />
          </div>
          <div className="mb-4.5">
            <TextEditor
              label="Blog Content"
              errorMessage={errors.content}
              data="Write your ideas and share your knowledges! 😎"
              onChange={(_, editor) => {
                const data = editor.getData();
                setData('content', data);
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <PrimaryButton disabled={processing} type="submit">
              Publish Blog
            </PrimaryButton>
            <PrimaryButton type="button">Post Preview</PrimaryButton>
          </div>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default CreateBlogPage;
