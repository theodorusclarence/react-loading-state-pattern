import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

const links = [
  { href: '/normal', label: 'Normal' },
  { href: '/swr', label: 'SWR' },
];

export default function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white shadow'>
      <div className='flex items-center justify-between h-14 layout'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Async Pattern
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
