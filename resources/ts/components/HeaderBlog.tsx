import { useState } from 'react';
import { Link } from '@inertiajs/react';
import NavigationToggle from './NavigationToggle';
import classNames from '@/utils/classNames';

function HeaderBlog() {
  const [isOpenToggle, setIsOpenToggle] = useState(false);

  return (
    <header
      className={classNames(
        'flex w-full items-center bg-white bg-opacity-70 shadow-sm backdrop-blur-lg',
      )}
    >
      <div className="container">
        <div className="relative flex items-center justify-between">
          <div className="px-4">
            <Link
              href="/"
              className="block py-6 text-lg font-bold text-primary"
            >
              <img
                src="/Logo FR.svg"
                width="24px"
                alt="FR"
                title="FR Project"
              />
            </Link>
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
                  <Link
                    href="/"
                    className="mx-8 flex py-2 text-base text-secondary group-hover:text-primary "
                  >
                    Home
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/blog"
                    className="mx-8 flex py-2 text-base text-secondary group-hover:text-primary "
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderBlog;
