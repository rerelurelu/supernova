import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import Footer from '~/components/footer/footer';
import Header from '~/components/header/header';
import { css } from '~/styled-system/css';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  
  return (
    <>
      <Header />
      <main class={css({ minH: '100vh', bg: 'bgBase' })}>
        <div class={css({ px: '3rem', pb: '15rem', pt: '3rem' })}>
          <Slot />
        </div>
      </main>
      <Footer />
    </>
  );
});
