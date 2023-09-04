import { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import { InertiaProps } from '@/interface/Inertia';
import AdminLayout from '@/layouts/AdminLayout';
import Form from '@/components/Form';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';

const urlBefore = [{ name: 'Social Media', url: '/social-media' }];

function EditSocialMedia({ auth, social_media }: InertiaProps) {
  const { data, setData, patch, processing, errors } = useForm({
    url: social_media?.url || '',
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    patch(route('social_media.update', social_media.id));
  };
  return (
    <AdminLayout user={auth.user}>
      <Head title="Edit Social Media" />
      <Breadcrumb pageName="Edit" urlBefore={urlBefore} />
      <div className="w-full lg:w-1/2">
        <Form onSubmit={submit}>
          <div className="mb-4.5">
            <TextInput
              label="Platform"
              id="platform"
              name="platform"
              type="text"
              value={social_media.platform}
              disabled
            />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="URL"
              id="url"
              name="url"
              type="url"
              placeholder="URL for Your Social Media"
              value={data.url}
              onChange={(e) => setData('url', e.target.value)}
            />
            <InputError message={errors.url} className="mt-2" />
          </div>

          <PrimaryButton disabled={processing} type="submit">
            Save
          </PrimaryButton>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default EditSocialMedia;
