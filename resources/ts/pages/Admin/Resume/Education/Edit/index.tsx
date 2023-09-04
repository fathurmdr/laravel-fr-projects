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

const urlBefore = [{ name: 'Project', url: '/admin/project' }];

function EditEducation({ auth, education }: InertiaProps) {
  const { data, setData, processing, patch, errors } = useForm({
    title: education.title || '',
    start_year: education.start_year || '',
    end_year: education.end_year || '',
    institution: education.institution || '',
    activities: education.activities,
  });

  const [activities, setActivities] = useState([
    ...education.activities,
    { description: '' },
  ]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    patch(route('education.update', education.id));
  };

  useEffect(() => {
    setData(
      'activities',
      activities.filter((item) => item.description !== ''),
    );
  }, [activities]);

  return (
    <AdminLayout user={auth.user}>
      <Head title="Edit Education" />
      <Breadcrumb pageName="Edit Education" urlBefore={urlBefore} />
      <div className="w-full lg:w-1/2">
        <Form onSubmit={submit}>
          <div className="mb-4.5">
            <TextInput
              label="Title"
              id="title"
              name="title"
              type="text"
              placeholder="Education title"
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
              placeholder="Education start_year"
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
              placeholder="Education end_year"
              value={data.end_year}
              onChange={(e) => setData('end_year', e.target.value)}
            />
            <InputError message={errors.title} className="mt-2" />
          </div>
          <div className="mb-4.5">
            <TextInput
              label="Institution"
              id="institution"
              name="institution"
              type="text"
              placeholder="Education institution"
              value={data.institution}
              onChange={(e) => setData('institution', e.target.value)}
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
                        className="bg-white"
                        id={`activity-${index}`}
                        name={`activity-${index}`}
                        placeholder="Education activity"
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

export default EditEducation;
