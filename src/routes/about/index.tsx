import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';
import Avatar from '~/components/avatar/avatar';
import { css } from '~/styled-system/css';

const iconSize = 24;

const sns = {
  github: { href: 'https://github.com/rerelurelu' },
  zenn: { href: 'https://zenn.dev/astrologian' },
} as const;

const intro = {
  para1: `フロントエンドエンジニア（仮）`,
} as const;

export default component$(() => {
  return (
    <div class={container}>
      <Avatar width={512} height={512} />
      <span class={myName}>relu</span>
      <ul class={iconContainer}>
        <li>
          <Link href={sns.github.href} target="_blank" class={snsLink}>
            <Image
              src={'/icons/github-logo.svg'}
              width={iconSize}
              height={iconSize}
              class={icon}
              alt={`Link to GitHub`}
            />
          </Link>
        </li>
        <li>
          <Link href={sns.zenn.href} target="_blank" class={snsLink}>
            <Image
              src={'/icons/zenn-logo.svg'}
              width={iconSize}
              height={iconSize}
              class={icon}
              alt={`Link to Zenn`}
            />
          </Link>
        </li>
      </ul>
      <div class={introContainer}>
        <p>{intro.para1}</p>
      </div>
    </div>
  );
});

const container = css({
  display: 'grid',
  placeItems: 'center',
  mt: { _default: '8rem', md: '9rem' },
  px: '1.5rem',
});

const myName = css({
  fontSize: '2.25rem',
  lineHeight: '2.5rem',
  mt: '2.5rem',
});

const iconContainer = css({
  mt: '1.5rem',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  listStyle: 'none',
});

const snsLink = css({
  textDecoration: 'underline',
  _hover: {
    opacity: '0.7',
  },
});

const icon = css({
  fill: '#3b82f6',
});

const introContainer = css({
  mt: '5rem',
  display: 'grid',
  w: '100%',
  maxW: '56rem',
  placeItems: 'center',
  lineHeight: '1.5rem',
});
