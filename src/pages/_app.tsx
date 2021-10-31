import axios from 'axios';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import '@/styles/globals.css';

import { simulateAsync } from '@/lib/helper';

import DismissableToast from '@/components/DismissableToast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DismissableToast />
      <SWRConfig
        value={{
          fetcher: (url) =>
            simulateAsync(1000, 0).then(() =>
              axios.get(url).then((res) => res.data)
            ),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
