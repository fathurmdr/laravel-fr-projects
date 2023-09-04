import { FormEvent, useEffect } from 'react';
import route from 'ziggy-js';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/layouts/GuestLayout';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import AvatarUpload from '@/components/AvatarUpload';

function RegisterPage() {
  const { data, setData, post, processing, errors, reset } = useForm<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    profile_photo: File | null;
  }>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    profile_photo: null,
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('register'));
  };

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div className="mt-4 flex  justify-center pb-8">
          <AvatarUpload
            id="profile_photo"
            name="profile_photo"
            onChange={(e) => {
              if (e.target.files) {
                setData('profile_photo', e.target.files[0]);
              }
            }}
          />
        </div>
        <div>
          <TextInput
            label="Name"
            placeholder="Enter Your Name..."
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={(e) => setData('name', e.target.value)}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
          <TextInput
            label="Email"
            placeholder="Enter Your Email..."
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            required
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <TextInput
            label="Password"
            placeholder="Enter Your Password..."
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <TextInput
            label="Confirm Password"
            placeholder="Confirm Your Password..."
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <PrimaryButton className="mt-8" disabled={processing}>
          Register
        </PrimaryButton>
        <div className="mt-4 flex justify-center">
          <Link
            href={route('login')}
            className="text-gray-600 hover:text-gray-900 rounded-md text-sm underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Already registered?
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}

export default RegisterPage;
