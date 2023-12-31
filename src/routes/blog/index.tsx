import { fetchPosts } from '~/api/client'
import BlogField from '~/components/blogField/blogField'
import ContentsTitle from '~/components/contentsTitle/contentsTitle'
import Pagination from '~/components/pagination/pagination'
import { OG_IMAGE } from '~/const/seo'
import { PER_PAGE } from '~/utils/constants'
import { getCurrentIndex } from '~/utils/getCurrentIndex'

import { component$ } from '@builder.io/qwik'
import { routeLoader$, useLocation } from '@builder.io/qwik-city'

import type { DocumentHead, Loader } from '@builder.io/qwik-city';
import type { PostsData } from '~/types';
export const usePostsLoader: Loader<PostsData> = routeLoader$(async () => {
  const { posts, totalCount } = await fetchPosts({ limit: PER_PAGE, offset: 0 });
  return { posts, totalCount };
});

export default component$(() => {
  const loc = useLocation();
  const currentIndex = getCurrentIndex(loc.url.pathname);
  const data = usePostsLoader();
  const totalCount = data.value.totalCount;
  const needPagination = totalCount > PER_PAGE;

  return (
    <>
      <ContentsTitle title={'Blog'} />
      <BlogField posts={data.value.posts} />
      {needPagination && <Pagination totalCount={totalCount} currentIndex={Number(currentIndex)} />}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Blog | relu',
  meta: [
    {
      name: 'description',
      content: `relu's blog list.`,
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
