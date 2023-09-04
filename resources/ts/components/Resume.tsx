import { Education, Experience } from '@/interface/Inertia';

interface ResumeProps {
  educations: Education[];
  experiences: Experience[];
}

function Resume({ educations, experiences }: ResumeProps) {
  return (
    <section id="resume" className="min-h-screen bg-white-2 pb-16 pt-28 ">
      <div className="container">
        <div className="w-full px-4">
          <div className="mx-auto mb-8 max-w-xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-secondary  sm:text-4xl lg:text-5xl">
              Resume
            </h2>
          </div>
        </div>
        <div className="flex flex-col justify-between lg:flex-row">
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            className="mb-8 flex w-full flex-col p-2 md:p-8 lg:w-1/2"
          >
            <h2 className="mb-6 text-xl font-bold text-secondary">Education</h2>
            <ul>
              {educations &&
                educations
                  .sort((a, b) => b.start_year - a.start_year)
                  .map((item, index) => (
                    <li
                      key={index}
                      className="relative ml-[13px] box-border border-l-2 border-primary pl-6 sm:pl-8"
                    >
                      <div className="circle absolute -left-[13px] top-0 box-border h-6 w-6 rounded-full border-2 border-primary bg-white-2" />
                      <h3 className="mb-2 text-lg font-bold text-primary">
                        {item.title}
                      </h3>
                      <span className="mb-4 inline-block bg-secondary px-1 text-yellow">
                        {item.start_year === item.end_year
                          ? item.start_year
                          : `${item.start_year} - ${item.end_year}`}
                      </span>
                      <div>
                        <span className="mb-2 inline-block italic">
                          {item.institution}
                        </span>
                        <ul className="ml-4 list-disc">
                          {item.activities &&
                            item.activities.map((activity, activityIndex) => (
                              <li
                                key={activityIndex}
                                className="whitespace-pre-line"
                              >
                                {activity.description}
                              </li>
                            ))}
                        </ul>
                      </div>
                      <br />
                      <br />
                    </li>
                  ))}
            </ul>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            className="flex w-full flex-col p-2 md:p-8 lg:w-1/2"
          >
            <h2 className="mb-6 text-xl font-bold text-secondary">
              Experiences
            </h2>
            <ul>
              {experiences &&
                experiences
                  .sort((a, b) => b.start_year - a.start_year)
                  .map((experience, index) => (
                    <li
                      key={index}
                      className="relative ml-[13px] box-border border-l-2 border-primary pl-6 sm:pl-8"
                    >
                      <div className="circle absolute -left-[13px] top-0 box-border h-6 w-6 rounded-full border-2 border-primary bg-white-2" />
                      <h3 className="mb-2 text-lg font-bold text-primary">
                        {experience.title}
                      </h3>
                      <span className="mb-4 inline-block bg-secondary px-1 text-yellow">
                        {experience.start_year === experience.end_year
                          ? experience.start_year
                          : `${experience.start_year} - ${experience.end_year}`}
                      </span>
                      <div>
                        <span className="mb-2 inline-block italic">
                          {experience.company}
                        </span>
                        <ul className="ml-4 list-disc">
                          {experience.activities &&
                            experience.activities.map(
                              (activity, activityIndex) => (
                                <li
                                  key={activityIndex}
                                  className="whitespace-pre-line"
                                >
                                  {activity.description}
                                </li>
                              ),
                            )}
                        </ul>
                      </div>
                      <br />
                      <br />
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
