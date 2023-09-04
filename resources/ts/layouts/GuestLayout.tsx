import { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

interface GuestLayoutProps {
  children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray pt-6 dark:bg-boxdark dark:text-bodydark sm:justify-center sm:pt-0">
      <div className="mt-6">
        <Link href="/">
          <img src="/Logo FR.svg" width="48px" alt="FR" title="FR Project" />
        </Link>
      </div>

      <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md dark:bg-boxdark-2 sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
