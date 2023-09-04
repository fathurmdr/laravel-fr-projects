import { useEffect, useRef, useState } from 'react';
import NavigationToggle from './NavigationToggle';
import classNames from '@/utils/classNames';

function HeaderHome() {
  const [isOpenToggle, setIsOpenToggle] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  const onScroll = () => {
    const header = headerRef.current;
    if (header) {
      const fixedNav = header.offsetTop;
      if (window.scrollY > fixedNav) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
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
    <header
      ref={headerRef}
      className={classNames(
        'flex w-full items-center bg-transparent',
        isScroll
          ? 'fixed top-0 z-[9999] bg-white bg-opacity-70 shadow-sm backdrop-blur-sm'
          : 'absolute left-0 top-0 z-10 ',
      )}
    >
      <div className="container">
        <div className="relative flex items-center justify-between">
          <div className="px-4">
            <a
              href="/#home"
              className="block py-6 text-lg font-bold text-primary"
            >
              <img
                src="/Logo FR.svg"
                width="24px"
                alt="FR"
                title="FR Project"
              />
            </a>
          </div>
          <div className="flex items-center px-4">
            <div
              className="relative h-8 w-8 lg:hidden"
              onClick={() => setIsOpenToggle(!isOpenToggle)}
            >
              <NavigationToggle isOpen={isOpenToggle} />
            </div>
            <nav
              className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg  lg:static lg:block lg:max-w-full lg:rounded-none lg:bg-transparent lg:shadow-none ${
                !isOpenToggle && 'hidden'
              }`}
            >
              <ul className="block lg:flex">
                <li className="group">
                  <a
                    href="/#home"
                    className="mx-8 flex py-2 text-base text-secondary group-hover:text-primary "
                  >
                    Home
                  </a>
                </li>
                <li className="group">
                  <a
                    href="/#blogs"
                    className="mx-8 flex py-2 text-base text-secondary group-hover:text-primary "
                  >
                    Blogs
                  </a>
                </li>
                <li className="group">
                  <a
                    href="/#projects"
                    className="mx-8 flex py-2 text-base text-secondary group-hover:text-primary "
                  >
                    Projects
                  </a>
                </li>
                <li className="group">
                  <a
                    href="/#skills"
                    className="mx-8 flex py-2 text-base text-secondary group-hover:text-primary "
                  >
                    Skills
                  </a>
                </li>
                <li className="group">
                  <a
                    href="/#resume"
                    className="mx-8 flex py-2 text-base text-secondary group-hover:text-primary "
                  >
                    Resume
                  </a>
                </li>
                <li className="group">
                  <a
                    href="/#contact"
                    className="mx-8 flex py-2 text-base text-secondary group-hover:text-primary "
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
