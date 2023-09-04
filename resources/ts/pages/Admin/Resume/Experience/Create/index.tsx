import { FormEvent, useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import { InertiaProps } from '@/interface/Inertia';
import AdminLayout from '@/layouts/AdminLayout';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import Form from '@/components/Form';
import TextInput from '@/components/TextInput';
import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextArea from '@/components/TextArea';

const urlBefore = [{ name: 'Experience', url: '/admin/experience' }];

function CreateExperience({ auth }: InertiaProps) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    start_year: '',
    end_year: '',
    company: '',
    activities: [{ description: '' }],
  });

  const [activities, setActivities] = useState([{ description: '' }]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('experience.store'));
  };

  useEffect(() => {
    setData(
      'activities',
      activities.filter((item) => item.description !== ''),
    );
  }, [activities]);
  return (
    <AdminLayout user={auth.user}>
      <Head title="Create Experience" />
      <Breadcrumb pageName="Create Experience" urlBefore={urlBefore} />
      <div className="w-full lg:w-1/2">
        <Form onSubmit={submit}>
          <div className="mb-4.5">
            <TextInput
              label="Title"
              id="title"
              name="title"
              type="text"
              placeholder="Experience title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            <InputError message={errors.title} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Start Year"
              id="start_year"
              name="start_year"
              type="text"
              placeholder="Experience start_year"
              value={data.start_year}
              onChange={(e) => setData('start_year', e.target.value)}
            />
            <InputError message={errors.title} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="End Year"
              id="end_year"
              name="end_year"
              type="text"
              placeholder="Experience end_year"
              value={data.end_year}
              onChange={(e) => setData('end_year', e.target.value)}
            />
            <InputError message={errors.title} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Institution"
              id="company"
              name="company"
              type="text"
              placeholder="Experience company"
              value={data.company}
              onChange={(e) => setData('company', e.target.value)}
            />
            <InputError message={errors.title} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <span className="mb-2.5 block text-black dark:text-white">
              Activities
            </span>
            <div className="rounded-md border border-stroke bg-gray-3 p-4 dark:border-strokedark dark:bg-graydark">
              {activities &&
                activities.map((activity, index) => (
                  <div key={index} className="flex gap-4">
                    <span>{index + 1}.</span>
                    <div className="grow">
                      <TextArea
                        className="min-h-[6rem] bg-white"
                        id={`activity-${index}`}
                        name={`activity-${index}`}
                        placeholder="Experience activity"
                        value={activity.description}
                        onBlur={() => {
                          if (
                            activities.find((item) => item.description === '')
                          ) {
                            setActivities([
                              ...activities.filter(
                                (item) => item.description !== '',
                              ),
                              { description: '' },
                            ]);
                          }
                        }}
                        onChange={(e) => {
                          const updatedActivities = [...activities];
                          updatedActivities[index].description = e.target.value;
                          if (updatedActivities[index].description) {
                            setActivities([
                              ...activities.filter(
                                (item) => item.description !== '',
                              ),
                              { description: '' },
                            ]);
                          } else {
                            setActivities(updatedActivities);
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <PrimaryButton disabled={processing} type="submit">
            Save
          </PrimaryButton>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default CreateExperience;
