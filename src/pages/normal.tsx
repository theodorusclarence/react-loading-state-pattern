import axios from 'axios';
import * as React from 'react';
import toast from 'react-hot-toast';

import { defaultToastMessage, simulateAsync } from '@/lib/helper';
import useLoadingToast from '@/hooks/toast/useLoadingToast';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { Pokemon, PokemonList } from '@/types/pokemon';

export default function NormalPage() {
  const isFirst = React.useRef<boolean>(true);
  const [pokemon, setPokemon] = React.useState<Array<Pokemon>>();

  const isLoading = useLoadingToast();

  const getData = () => {
    toast.promise(
      simulateAsync(2000, +isFirst.current)
        .then(() => {
          axios
            .get<PokemonList>('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then((res) => {
              setPokemon(res.data.results);
            });
        })
        .finally(() => {
          isFirst.current = false;
        }),
      {
        ...defaultToastMessage,
      }
    );
  };

  return (
    <Layout>
      <Seo templateTitle='Normal' />

      <main>
        <section className=''>
          <div className='py-20 layout min-h-main'>
            <h1>Get request using axios</h1>
            <p className='mt-2 text-gray-700'>
              Using axios to fetch{' '}
              <code>https://pokeapi.co/api/v2/pokemon?limit=20</code>
            </p>
            <p className='mt-2 text-sm text-gray-800'>
              <CustomLink href='https://github.com/theodorusclarence/react-async-pattern/blob/main/src/pages/normal.tsx'>
                See the code
              </CustomLink>
            </p>

            <Button
              isLoading={isLoading}
              disabled={!!pokemon}
              className='mt-4'
              variant='light'
              onClick={getData}
            >
              getData
            </Button>
            <div className='mt-2 space-y-1'>
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
