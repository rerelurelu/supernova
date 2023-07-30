import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { ENTRIES } from '~/const/entries';
import { cva } from '~/styled-system/css';
import { getPathname } from '~/utils/getPathname';

export default component$(() => {
  const loc = useLocation();

  const pathname = getPathname(loc.url.pathname);

  return (
    <header class={headerRecipe()}>
      <ul class={ulRecipe()}>
        {ENTRIES.map(({ href, content }) => {
          return (
            <li key={content}>
              <Link href={href} id={content} class={linkRecipe()}>
                <span
                  class={gradationRecipe(content === pathname ? { visual: 'active' } : undefined)}
                >
                  {content}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
});

const headerRecipe = cva({
  base: {
    width: '100%',
    minH: '4rem',
    alignItems: 'center',
    height: '5rem',
    top: '0',
    left: '0',
    right: '0',
    pt: '1rem',
    px: { base: '0', md: '3rem' },
    zIndex: '50',
    display: 'flex',
    justifyContent: { base: 'center', md: 'end' },
    bg: 'bgHeader',
    position: 'fixed',
    backdropFilter: 'blur(8px)',
  },
});

const ulRecipe = cva({
  base: {
    width: 'max-content',
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
});

const linkRecipe = cva({
  base: {
    bg: { _hover: 'transparent', _focus: 'transparent' },
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    color: { base: 'white' },
    alignItems: 'center',
    userSelect: 'none',
  },
});

const gradationRecipe = cva({
  base: {
    fontSize: { md: 'large' },
    fontWeight: '600',
    textTransform: 'capitalize',
    letterSpacing: '0.1em',
    fontSmoothing: 'antialiased',
    bg: { _hover: 'linear-gradient(to bottom, #00f1f9, #cb33f4)' },
    backgroundClip: { _hover: 'text' },
    WebkitTextFillColor: { _hover: 'transparent' },
  },
  variants: {
    visual: {
      active: {
        bg: 'linear-gradient(to bottom, #00f1f9, #cb33f4)',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
  },
});