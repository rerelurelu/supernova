import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { getPostList } from '~/api/client';
import BlogField from '~/components/blogField/blogField';
import Pagination from '~/components/pagination/pagination';
import { OG_IMAGE } from '~/const/seo';
import { PER_PAGE } from '~/utils/constants';
import { getCurrentIndex } from '~/utils/getCurrentIndex';

export const usePostsLoader = routeLoader$(async ({ params }) => {
  const offset = (Number(params.page) - 1) * PER_PAGE;
  const { posts, totalCount } = await getPostList({ limit: PER_PAGE, offset: offset });
  return { posts, totalCount };
});

export default component$(() => {
  const loc = useLocation();
  const currentIndex = getCurrentIndex(loc.url.pathname);
  const data = usePostsLoader();

  return (
    <>
      <BlogField posts={data.value.posts} />
      <Pagination totalCount={data.value.totalCount} currentIndex={Number(currentIndex)} />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Blog | relu',
  meta: [
    {
      name: 'description',
      content: `relu's blog`,
    },
    {
      name: 'type',
      content: 'website',
    },
    {
      property: 'og:title',
      content: 'Blog | relu',
    },
    {
      property: 'og:description',
      content: `relu's blog`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image',
      content: OG_IMAGE.IMAGE,
    },
    {
      property: 'og:image:type',
      content: OG_IMAGE.IMAGE_TYPE,
    },
    {
      property: 'og:image:width',
      content: OG_IMAGE.WIDTH,
    },
    {
      property: 'og:image:height',
      content: OG_IMAGE.HEIGHT,
    },
  ],
};
