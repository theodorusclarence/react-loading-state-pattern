import * as React from 'react';
import useSWR from 'swr';

import useWithToast from '@/hooks/toast/useWithToast';

import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { PokemonList } from '@/types/pokemon';

export default function SWRPage() {
  const {
    data: pokemonData,
    isValidating,
    isLoading,
  } = useWithToast(
    useSWR<PokemonList>('https://pokeapi.co/api/v2/pokemon?limit=20')
  );

  const pokemon = pokemonData?.results;

  return (
    <Layout>
      <Seo templateTitle='SWR' />

      <main>
        <section className=''>
          <div className='py-20 layout min-h-main'>
            <h1>Get request using SWR</h1>
            <p className='mt-2 text-gray-700'>
              Using SWR to fetch{' '}
              <code>https://pokeapi.co/api/v2/pokemon?limit=20</code>
            </p>
            <p className='mt-2 text-sm text-gray-800'>
              <CustomLink href='https://github.com/theodorusclarence/react-async-pattern/blob/main/src/pages/swr.tsx'>
                See the code
              </CustomLink>
            </p>

            <p className='inline-block p-2 mt-4 font-medium bg-yellow-100 rounded'>
              loadingStatus:{' '}
              {isLoading ? 'loading' : isValidating ? 'validating' : 'idle'}
            </p>

            <div className='mt-4 space-y-1'>
              {pokemon ? (
                pokemon.map((poke) => (
                  <p key={poke.name}>
                    <CustomLink href={poke.url}>{poke.name}</CustomLink>
                  </p>
                ))
              ) : (
                <p>
                  Data not available. First time fetch will be 100% error so you
                  can see the example.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
