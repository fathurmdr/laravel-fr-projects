import { useState, useEffect } from 'react';
import ImageSlider from '@/components/ImageSlider';
import { Project as ProjectTypes } from '@/interface/Inertia';

interface ProjectProps {
  projects: ProjectTypes[];
}

function Project({ projects }: ProjectProps) {
  const [autoPlay, setAutoPlay] = useState(false);

  let isAutoPlayStart = false;

  const onScroll = () => {
    const projectsElement = document.querySelector('#projects');
    if (projectsElement) {
      const projectsPosition = projectsElement.getBoundingClientRect();
      if (projectsPosition.top <= window.innerHeight && !isAutoPlayStart) {
        isAutoPlayStart = true;
        setAutoPlay(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="projects" className="min-h-screen bg-yellow pb-16 pt-28 ">
      <div className="container">
        <div className="w-full px-4">
          <div className="mx-auto mb-8 max-w-xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-secondary  sm:text-4xl lg:text-5xl">
              Project Showcase
            </h2>
          </div>
        </div>

        {/* <!-- Image Slider Start --> */}
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="image-slider mx-auto w-full max-w-3xl"
        >
          {projects && <ImageSlider images={projects} autoPlay={autoPlay} />}
        </div>
        {/* <!-- Image Slider end --> */}
      </div>
    </section>
  );
}

export default Project;
