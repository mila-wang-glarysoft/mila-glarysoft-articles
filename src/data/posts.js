const categoryMeta = {
  'Product Updates': {
    slug: 'product-updates',
    description: 'Release notes, feature highlights, and product improvements.',
  },
  'Company News': {
    slug: 'company-news',
    description: 'Announcements, campaigns, partnerships, and Glarysoft updates.',
  },
  'Tips & Insights': {
    slug: 'tips-insights',
    description: 'Short practical ideas from the Glarysoft team.',
  },
  'User Stories': {
    slug: 'user-stories',
    description: 'Real-world scenarios and customer-centered product stories.',
  },
};

const postModules = import.meta.glob('../../content/posts/*.md', { eager: true });
const rawPostModules = import.meta.glob('../../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const monthLabels = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.',
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  return `${monthLabels[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getRawBody(raw) {
  return raw.replace(/^---[\s\S]*?---\s*/, '');
}

function getHeadings(raw) {
  return getRawBody(raw)
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const text = line.replace(/^##\s+/, '').trim();
      return {
        id: slugify(text),
        text,
      };
    });
}

export const categories = Object.entries(categoryMeta).map(([name, meta]) => ({
  name,
  ...meta,
  href: `/categories/${meta.slug}/`,
}));

export const posts = Object.entries(postModules)
  .map(([path, module]) => {
    const raw = rawPostModules[path];
    const category = module.frontmatter.category;
    const categoryInfo = categoryMeta[category];

    return {
      ...module.frontmatter,
      Content: module.default,
      body: getRawBody(raw),
      headings: getHeadings(raw),
      href: `/${module.frontmatter.slug}/`,
      categorySlug: categoryInfo.slug,
      categoryHref: `/categories/${categoryInfo.slug}/`,
      dateLabel: formatDate(module.frontmatter.date),
    };
  })
  .filter((post) => !post.draft)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getPostsByCategory(category) {
  return posts.filter((post) => post.category === category);
}

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getRelatedPosts(currentSlug, limit = 3) {
  return posts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
