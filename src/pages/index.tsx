import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-gray-100'>
          <div className='flex flex-col items-center justify-center min-h-screen text-center layout'>
            <h1>Async Pattern</h1>
            <p className='mt-2 text-sm text-gray-700'>
              🔥 Hassle free asynchronous pattern using React Hot Toast and SWR.
            </p>
            <p className='mt-2 text-sm text-gray-800'>
              <CustomLink href='https://github.com/theodorusclarence/react-async-pattern'>
                See the repository
              </CustomLink>
            </p>

            <ButtonLink className='mt-6' href='/components' variant='light'>
              Get example
            </ButtonLink>
            <ButtonLink className='mt-2' href='/components' variant='light'>
              Post example
            </ButtonLink>

            <footer className='absolute text-gray-600 bottom-2'>
              © {new Date().getFullYear()} By{' '}
              <CustomLink href='https://theodorusclarence.com?ref=tsnextstarter'>
                Theodorus Clarence
              </CustomLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
