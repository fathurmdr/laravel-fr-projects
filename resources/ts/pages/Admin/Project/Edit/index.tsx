import { FormEvent, useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import { InertiaProps } from '@/interface/Inertia';
import AdminLayout from '@/layouts/AdminLayout';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import Form from '@/components/Form';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextArea from '@/components/TextArea';
import ImageUpload from '@/components/ImageUpload';

export type ErrorFields = Partial<
  Record<'title' | 'image' | 'url' | 'description', string>
>;

const urlBefore = [{ name: 'Project', url: '/admin/project' }];

function EditProject({ auth, project }: InertiaProps) {
  const { data, setData, processing } = useForm<{
    title: string;
    image: File | null;
    url: string;
    description: string;
  }>({
    title: project.title || '',
    image: null,
    url: project.url || '',
    description: project.description || '',
  });

  const [errors, setErrors] = useState<ErrorFields>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.post(
      route('project.update', project.id),
      {
        _method: 'patch',
        ...data,
      },
      {
        onError: (errors) => setErrors(errors),
      },
    );
  };
  return (
    <AdminLayout user={auth.user}>
      <Head title="Edit Project" />
      <Breadcrumb pageName="Edit Project" urlBefore={urlBefore} />
      <div className="w-full lg:w-1/2">
        <Form onSubmit={submit}>
          <div className="mb-4.5">
            <TextInput
              label="Title"
              id="title"
              name="title"
              type="text"
              placeholder="Project title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            <InputError message={errors.title} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="URL"
              id="url"
              name="url"
              type="url"
              placeholder="The project link"
              value={data.url}
              onChange={(e) => setData('url', e.target.value)}
            />
            <InputError message={errors.url} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextArea
              label="Description"
              id="description"
              name="description"
              placeholder="Project description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
            <InputError message={errors.description} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <ImageUpload
              label="Project Image"
              id="image"
              name="image"
              image={data.image}
              setImage={(image) => setData('image', image)}
              imageUrl={project.image}
            />
            <InputError message={errors.image} className="mt-2" />
          </div>
          <PrimaryButton disabled={processing} type="submit">
            Save
          </PrimaryButton>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default EditProject;
