import { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import { InertiaProps } from '@/interface/Inertia';
import AdminLayout from '@/layouts/AdminLayout';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import Form from '@/components/Form';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import ImageUpload from '@/components/ImageUpload';

const urlBefore = [{ name: 'Skill', url: '/skill' }];

function CreateSkill({ auth }: InertiaProps) {
  const { data, setData, post, processing, errors } = useForm<{
    title: string;
    icon: File | null;
  }>({
    title: '',
    icon: null,
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('skill.store'));
  };
  return (
    <AdminLayout user={auth.user}>
      <Head title="Create Skill" />
      <Breadcrumb pageName="Create Skill" urlBefore={urlBefore} />
      <div className="w-full lg:w-1/2">
        <Form onSubmit={submit}>
          <div className="mb-4.5">
            <TextInput
              label="Title"
              id="title"
              name="title"
              type="text"
              placeholder="Skill title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            <InputError message={errors.title} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <ImageUpload
              label="Skill Image"
              id="icon"
              name="icon"
              image={data.icon}
              setImage={(icon) => setData('icon', icon)}
            />
            <InputError message={errors.icon} className="mt-2" />
          </div>
          <PrimaryButton disabled={processing} type="submit">
            Save
          </PrimaryButton>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default CreateSkill;
