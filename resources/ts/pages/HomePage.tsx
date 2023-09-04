import { ToastContainer } from 'react-toastify';
import BackToTop from '@/components/BackToTop';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import HeaderHome from '@/components/HeaderHome';
import Hero from '@/components/Hero';
import Project from '@/components/Project';
import Resume from '@/components/Resume';
import Skills from '@/components/Skills';
import { InertiaProps } from '@/interface/Inertia';
import 'react-toastify/dist/ReactToastify.css';
import Blogs from '@/components/Blogs';

function HomePage({
  contact,
  social_media_list,
  hero,
  blogs,
  projects,
  skills,
  educations,
  experiences,
}: InertiaProps) {
  return (
    <>
      <HeaderHome />
      <Hero contact={contact} socialMediaList={social_media_list} hero={hero} />
      <Blogs blogs={blogs} />
      <Project projects={projects} />
      <Skills skills={skills} />
      <Resume educations={educations} experiences={experiences} />
      <ContactForm />
      <BackToTop />
      <Footer contact={contact} socialMediaList={social_media_list} />
      <ToastContainer />
    </>
  );
}

export default HomePage;
