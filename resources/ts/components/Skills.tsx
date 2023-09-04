// import { useState, useEffect } from 'react';
// import IconCarousel from '@/components/IconCarousel';
import { Skill as SkillTypes } from '@/interface/Inertia';

interface SkillProps {
  skills: SkillTypes[];
}

function Skills({ skills }: SkillProps) {
  // const [autoPlay, setAutoPlay] = useState(false);

  // let isAutoPlayStart = false;

  // const onScroll = () => {
  //   const skillsElement = document.querySelector('#skills');
  //   if (skillsElement) {
  //     const skillsPosition = skillsElement.getBoundingClientRect();
  //     if (skillsPosition.top <= window.innerHeight && !isAutoPlayStart) {
  //       isAutoPlayStart = true;
  //       setAutoPlay(true);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', onScroll);

  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, []);
  return (
    <section id="skills" className="min-h-screen pb-16 pt-28 ">
      <div className="container">
        <div className="w-full px-4">
          <div className="mx-auto mb-8 max-w-xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-secondary  sm:text-4xl lg:text-5xl">
              Skills
            </h2>
          </div>
        </div>

        {/* <!-- Icon Carousel Start --> */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="flex justify-center py-16"
        >
          {/* {skills && <IconCarousel icons={skills} autoPlay={autoPlay} />} */}
          <div className="flex w-full max-w-203 flex-wrap justify-center">
            {skills &&
              skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex w-24 shrink-0 flex-col items-center justify-end px-6 text-sm md:text-base"
                >
                  <img
                    className="h-20 w-20 object-contain"
                    src={`/uploads/${skill.icon}`}
                    alt={skill.title}
                  />
                  <p className="py-2 text-xs text-dark md:text-sm ">
                    {skill.title}
                  </p>
                </div>
              ))}
          </div>
        </div>
        {/* <!-- Icon Carousel end --> */}
      </div>
    </section>
  );
}

export default Skills;
