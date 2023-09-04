import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import GuestLayout from '@/layouts/GuestLayout';
import PrimaryButton from '@/components/PrimaryButton';
import { InertiaProps } from '@/interface/Inertia';

function VerifyEmailPage({ status }: InertiaProps) {
  const { post, processing } = useForm({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('verification.send'));
  };

  return (
    <GuestLayout>
      <Head title="Email Verification" />

      <div className="text-gray-600 mb-4 text-sm">
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn't receive the email, we will gladly send you another.
      </div>

      {status === 'verification-link-sent' && (
        <div className="mb-4 text-sm font-medium text-green-600">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}

      <form onSubmit={submit}>
        <div className="mt-4 flex items-center justify-between">
          <PrimaryButton disabled={processing}>
            Resend Verification Email
          </PrimaryButton>

          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="text-gray-600 hover:text-gray-900 rounded-md text-sm underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Log Out
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}

export default VerifyEmailPage;
