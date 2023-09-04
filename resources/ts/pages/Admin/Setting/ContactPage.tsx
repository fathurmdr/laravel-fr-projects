import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import route from 'ziggy-js';
import { InertiaProps } from '@/interface/Inertia';
import AdminLayout from '@/layouts/AdminLayout';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import Form from '@/components/Form';
import TextInput from '@/components/TextInput';
import PrimaryButton from '@/components/PrimaryButton';
import InputError from '@/components/InputError';

function ContactPage({ auth, contact }: InertiaProps) {
  const { data, setData, patch, processing, errors } = useForm({
    phone_number: contact?.phone_number || '',
    email: contact?.email || '',
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    patch(route('contact.update', contact.id));
  };

  return (
    <AdminLayout user={auth.user}>
      <Head title="Contact" />
      <Breadcrumb pageName="Contact" />
      <div className="w-full lg:w-1/2">
        <Form onSubmit={submit}>
          <div className="mb-4.5">
            <TextInput
              label="Phone Number"
              id="phone_number"
              name="phone_number"
              type="text"
              placeholder="Enter Phone Number"
              value={data.phone_number}
              onChange={(e) => setData('phone_number', e.target.value)}
            />
            <InputError message={errors.phone_number} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder=" Enter Email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          <PrimaryButton disabled={processing} type="submit">
            Save
          </PrimaryButton>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default ContactPage;
