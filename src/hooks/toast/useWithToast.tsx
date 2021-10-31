import * as React from 'react';
import toast from 'react-hot-toast';
import { SWRResponse } from 'swr';

import { defaultToastMessage } from '@/lib/helper';

import useLoadingToast from './useLoadingToast';

type OptionType = {
  runCondition?: boolean;
  loading?: string;
  success?: string;
  error?: string;
};

export default function useWithToast<T, E>(
  swr: SWRResponse<T, E>,
  { runCondition, ...customMessages }: OptionType = { runCondition: true }
) {
  const { data, error } = swr;
  const [toastId, setToastId] = React.useState(data ? 'done' : 'idle');

  const toastMessage = {
    ...defaultToastMessage,
    ...customMessages,
  };

  React.useEffect(() => {
    // if toastId is done,
    // then it is not the first render or the data is already cached
    if (!runCondition) return;
    if (toastId === 'done') return;

    if (error) {
      toast.error(toastMessage.error, { id: toastId });
      setToastId('done');
    } else if (data) {
      toast.success(toastMessage.success, { id: toastId });
      setToastId('done');
    } else {
      setToastId(toast.loading(toastMessage.loading));
    }

    return () => {
      toast.dismiss();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, runCondition]);

  return { ...swr, isLoading: useLoadingToast() };
}
