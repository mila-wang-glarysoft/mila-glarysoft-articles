import { posts } from './posts.js';

export const articleCategories = [
  {
    slug: 'windows-tips',
    name: 'Windows Tips',
    href: '/windows-tips/',
    description: 'Practical Windows settings, shortcuts, maintenance tips, and everyday productivity ideas.',
    emptyMessage: 'More Windows tips are coming soon.',
  },
  {
    slug: 'how-to',
    name: 'How To',
    href: '/how-to/',
    description: 'Step-by-step guides for cleaning, optimizing, securing, and troubleshooting Windows PCs.',
    emptyMessage: 'New how-to guides are coming soon.',
  },
  {
    slug: 'hardware',
    name: 'Hardware',
    href: '/hardware/',
    description: 'Helpful articles about drives, memory, drivers, external devices, and PC performance hardware.',
    emptyMessage: 'Hardware guides are coming soon.',
  },
];

export function getArticleCategoryBySlug(slug) {
  return articleCategories.find((category) => category.slug === slug);
}

export function getPostsByArticleCategory(slug, limit) {
  const matchedPosts = posts.filter((post) => post.collectionSlug === slug);

  return typeof limit === 'number' ? matchedPosts.slice(0, limit) : matchedPosts;
}
