import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import { toast } from 'react-toastify';
import PrimaryButton from './PrimaryButton';
import InputError from './InputError';

function ContactForm() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    message: '',
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('send_message'), {
      preserveScroll: true,
      onSuccess: () =>
        toast.success(
          <div className="flex flex-col pl-2">
            <span className="font-semibold text-success">
              Send message success!
            </span>
            <span className="text-xs text-graydark">
              we will send email back soon 😊.
            </span>
          </div>,
        ),
    });
  };
  return (
    <section id="contact" className="min-h-screen bg-tosca pb-32 pt-32 ">
      <div className="container">
        <div className="w-full px-4">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl">
              Contact Me
            </h2>
          </div>
        </div>
        <form className="w-full px-4" onSubmit={submit}>
          <div className="w-full  max-w-180 lg:mx-auto lg:w-3/5">
            <div className="mb-8 w-full">
              <label
                htmlFor="name"
                className="text-base font-semibold text-secondary"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                autoComplete="off"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full rounded-sm bg-transparent bg-white-2 px-3 py-2 text-form-input ring-1 ring-dark focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mb-8 w-full">
              <label
                htmlFor="email"
                className="text-base font-semibold text-secondary"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="w-full rounded-sm bg-transparent bg-white-2 px-3 py-2 text-form-input ring-1 ring-dark focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="mb-8 w-full">
              <label
                htmlFor="message"
                className="text-base font-semibold text-secondary"
              >
                Message
              </label>
              <textarea
                id="message"
                autoComplete="off"
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}
                className="h-36 w-full rounded-sm bg-transparent bg-white-2 px-3 py-2 text-form-input ring-1 ring-dark focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <InputError message={errors.message} className="mt-2" />
            </div>
            <div className="w-full">
              <PrimaryButton disabled={processing}>Send</PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
