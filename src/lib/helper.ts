export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
};
export function openGraph({
  siteName,
  templateTitle,
  description,
  logo = 'https://og.thcl.dev/images/logo.jpg',
}: OpenGraphType): string {
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  return `https://og.thcl.dev/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
}

/**
 * Can simulate error with default 0.2 seconds, or set a custom delay from localStorage with key `errorRate` from 0-1
 * @param ms waiting time in milliseconds
 * @param errorRate rate of error from 0 - 1, default 0.2
 */
export function simulateAsync(ms: number, errorRate: number): Promise<unknown> {
  return new Promise((resolve, reject) =>
    setTimeout(
      Math.random() > +errorRate
        ? resolve
        : () =>
            reject({
              response: {
                data: {
                  msg: `This is an error simulation`,
                },
              },
            }),
      ms
    )
  );
}

export const defaultToastMessage = {
  loading: 'Loading...',
  success: 'Data fetched successfully',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (err: any) =>
    err?.response?.data?.msg + '' ?? 'Something is wrong, please try again',
};
