'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-600';
  };

  return (
    <nav className="bg-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-emerald-800">
                Hello Next
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/' ? 'border-emerald-600' : 'border-transparent'
                } ${isActive('/')}`}
              >
                Home
              </Link>
              <Link
                href="/words"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/words' ? 'border-emerald-600' : 'border-transparent'
                } ${isActive('/words')}`}
              >
                Words
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}