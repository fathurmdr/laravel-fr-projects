import { FormEvent, useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import route from 'ziggy-js';
import AdminLayout from '../../layouts/AdminLayout';
import Breadcrumb from '../../components/Admin/Breadcrumb';
import { InertiaProps } from '@/interface/Inertia';
import Form from '@/components/Form';
import TextInput from '@/components/TextInput';
import PrimaryButton from '@/components/PrimaryButton';
import TextArea from '@/components/TextArea';
import ImageUpload from '@/components/ImageUpload';
import InputError from '@/components/InputError';

export type ErrorFields = Partial<
  Record<'name' | 'tagline' | 'tagline_bold' | 'description' | 'image', string>
>;

function HeroPage({ auth, hero }: InertiaProps) {
  const { data, setData, processing } = useForm<{
    name: string;
    tagline: string;
    tagline_bold: string;
    description: string;
    image: File | null;
  }>({
    name: hero?.name || '',
    tagline: hero?.tagline || '',
    tagline_bold: hero?.tagline_bold || '',
    description: hero?.description || '',
    image: null,
  });

  const [errors, setErrors] = useState<ErrorFields>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.post(
      route('hero.update', hero.id),
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
      <Head title="Hero" />
      <Breadcrumb pageName="Hero" />
      <div className="w-full lg:w-1/2">
        <Form onSubmit={submit}>
          <div className="mb-4.5">
            <TextInput
              label="Name"
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            <InputError message={errors.name} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Tagline"
              id="tagline"
              name="tagline"
              type="text"
              placeholder="Tagline"
              value={data.tagline}
              onChange={(e) => setData('tagline', e.target.value)}
            />
            <InputError message={errors.tagline} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Tagline Bold"
              id="tagline_bold"
              name="tagline_bold"
              type="text"
              placeholder="Tagline with font bold"
              value={data.tagline_bold}
              onChange={(e) => setData('tagline_bold', e.target.value)}
            />
            <InputError message={errors.tagline_bold} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextArea
              label="Description"
              id="description"
              name="description"
              placeholder="Tell about yourself"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
            <InputError message={errors.description} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <ImageUpload
              label="Hero Image"
              id="image"
              name="image"
              image={data.image}
              imageUrl={hero.image}
              setImage={(image) => setData('image', image)}
            />
            <InputError message={errors.image} className="mt-2" />
          </div>
          {/* <div className="mb-4.5">
            <Table
              title="Social media"
              columns={socialMediaColumns}
              data={social_media}
            />
          </div> */}

          <PrimaryButton disabled={processing} type="submit">
            Save
          </PrimaryButton>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default HeroPage;
