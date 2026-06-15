const categoryDefinitions = {
  'glary-utilities': {
    name: 'Glary Utilities',
    description: 'Guides for Glary Utilities and its built-in modules.',
    order: 10,
  },
  introduction: {
    name: 'Introduction',
    description: 'Getting started with Glary Utilities.',
    parentSlug: 'glary-utilities',
    order: 11,
  },
  'global-modules': {
    name: 'Global Modules',
    description: 'Shared Glary Utilities features and global tools.',
    parentSlug: 'glary-utilities',
    order: 12,
  },
  'cleanup-repair': {
    name: 'Clean Up & Repair',
    description: 'Cleanup, repair, and maintenance modules in Glary Utilities.',
    parentSlug: 'glary-utilities',
    order: 13,
  },
  'optimize-improve': {
    name: 'Optimize & Improve',
    description: 'Performance and optimization modules in Glary Utilities.',
    parentSlug: 'glary-utilities',
    order: 14,
  },
  'privacy-security': {
    name: 'Privacy & Security',
    description: 'Privacy and security modules in Glary Utilities.',
    parentSlug: 'glary-utilities',
    order: 15,
  },
  'files-folders': {
    name: 'Files & Folders',
    description: 'File and folder tools in Glary Utilities.',
    parentSlug: 'glary-utilities',
    order: 16,
  },
  'system-tools': {
    name: 'System Tools',
    description: 'System management tools in Glary Utilities.',
    parentSlug: 'glary-utilities',
    order: 17,
  },
  'file-recovery': {
    name: 'File Recovery',
    description: 'Guides for Glarysoft File Recovery.',
    order: 20,
  },
  'malware-hunter': {
    name: 'Malware Hunter',
    description: 'Guides for Glarysoft Malware Hunter.',
    order: 30,
  },
  'software-update': {
    name: 'Software Update',
    description: 'Guides for Glarysoft Software Update.',
    order: 40,
  },
  support: {
    name: 'Support',
    description: 'License, account, and support articles.',
    order: 50,
  },
  'knowledge-base': {
    name: 'Knowledge Base',
    description: 'Glarysoft Knowledge Base articles.',
    order: 100,
  },
};

const basePath = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

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

export const pageSize = 12;

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function slugifyTag(value) {
  return slugify(value);
}

export function formatTagName(value = '') {
  return decodeEntities(value)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function withBase(path = '') {
  return `${basePath}${path}`.replace(/\/{2,}/g, '/');
}

function getCategoryHref(slug) {
  const definition = getCategoryDefinition(slug);
  return definition.parentSlug
    ? withBase(`${definition.parentSlug}/${slug}/`)
    : withBase(`${slug}/`);
}

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  return `${monthLabels[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getRawBody(raw) {
  return raw.replace(/^---[\s\S]*?---\s*/, '');
}

function getStrongHeadingText(line) {
  const trimmed = line.trim();
  const standaloneStrong = trimmed.match(/^\*\*(.+?)\*\*$/);
  if (standaloneStrong) return standaloneStrong[1];

  const numberedStrong = trimmed.match(/^(?:\d+\\?\.\s*)?\*\*(.+?)\*\*/);
  if (!numberedStrong) return null;

  const text = numberedStrong[1].trim();
  if (!text) return null;
  if (text.length > 90) return null;
  if (text.includes(':') && text.length > 55) return null;

  return text;
}

function getHeadings(raw) {
  const headings = [];

  getRawBody(raw)
    .split('\n')
    .forEach((line) => {
      const markdownHeading = line.match(/^#{2,4}\s+(.+)$/);
      const text = markdownHeading
        ? markdownHeading[1].trim()
        : getStrongHeadingText(line);

      if (!text) return;

      headings.push({
        id: slugify(text),
        text: decodeEntities(text.replace(/\\\./g, '.')),
      });
    });

  return headings;
}

function titleize(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function decodeEntities(value = '') {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function getPrimaryCategory(frontmatter) {
  const category = frontmatter.category || frontmatter.categories;
  if (Array.isArray(category)) return category[0] || 'knowledge-base';
  return category || 'knowledge-base';
}

function getCategoryDefinition(slug) {
  return categoryDefinitions[slug] || {
    name: titleize(slug),
    description: `${titleize(slug)} articles from the Glarysoft Knowledge Base.`,
    order: 1000,
  };
}

function normalizeList(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function normalizeImagePath(value) {
  if (!value) return '';
  if (/^(https?:)?\/\//.test(value) || value.startsWith('/')) return value;
  return withBase(value);
}

function getSlugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '');
}

function getExcerpt(raw, frontmatter) {
  if (frontmatter.excerpt) return frontmatter.excerpt;

  return getRawBody(raw)
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`>[\]()\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

export const posts = Object.entries(postModules)
  .map(([path, module]) => {
    const raw = rawPostModules[path];
    const slug = module.frontmatter.slug || getSlugFromPath(path);
    const categorySlug = getPrimaryCategory(module.frontmatter);
    const categoryInfo = getCategoryDefinition(categorySlug);

    return {
      ...module.frontmatter,
      slug,
      title: decodeEntities(module.frontmatter.title),
      category: categoryInfo.name,
      tags: normalizeList(module.frontmatter.tags).map(decodeEntities),
      Content: module.default,
      body: getRawBody(raw),
      excerpt: getExcerpt(raw, module.frontmatter),
      headings: getHeadings(raw),
      href: withBase(`${slug}/`),
      categorySlug,
      categoryHref: getCategoryHref(categorySlug),
      dateLabel: formatDate(module.frontmatter.date),
      featured_image: normalizeImagePath(
        module.frontmatter.featured_image || module.frontmatter.coverImage
      ),
    };
  })
  .filter((post) => !post.draft)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const categories = Array.from(
  new Map(
    Object.entries(categoryDefinitions)
      .filter(([slug, definition]) => {
        const hasDirectPosts = posts.some((post) => post.categorySlug === slug);
        const hasChildPosts = posts.some((post) => {
          const childDefinition = getCategoryDefinition(post.categorySlug);
          return childDefinition.parentSlug === slug;
        });
        return hasDirectPosts || hasChildPosts;
      })
      .map(([slug, definition]) => [
        slug,
        {
          name: definition.name,
          slug,
          description: definition.description,
          href: getCategoryHref(slug),
          parentSlug: definition.parentSlug || null,
          order: definition.order,
          depth: definition.parentSlug ? 1 : 0,
          postCount: getPostsByCategorySlug(slug).length,
        },
      ])
  ).values()
).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

export const topCategories = categories.filter((category) => !category.parentSlug);

export function getCategoryChildren(slug) {
  return categories.filter((category) => category.parentSlug === slug);
}

function getPostsByCategorySlug(slug) {
  const childSlugs = Object.entries(categoryDefinitions)
    .filter(([, definition]) => definition.parentSlug === slug)
    .map(([childSlug]) => childSlug);

  return posts.filter(
    (post) => post.categorySlug === slug || childSlugs.includes(post.categorySlug)
  );
}

export function getPostsByCategory(category) {
  return posts.filter(
    (post) =>
      post.category === category ||
      post.categorySlug === category ||
      getCategoryDefinition(post.categorySlug).parentSlug === category
  );
}

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getRelatedPosts(currentSlug, limit = 3) {
  return posts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}

export const tags = Array.from(
  posts
    .flatMap((post) => post.tags)
    .reduce((tagMap, tag) => {
      const slug = slugifyTag(tag);
      const existing = tagMap.get(slug);
      tagMap.set(slug, {
        name: existing?.name || formatTagName(tag),
        slug,
        href: withBase(`tags/${slug}/`),
        postCount: (existing?.postCount || 0) + 1,
      });
      return tagMap;
    }, new Map())
    .values()
).sort((a, b) => a.name.localeCompare(b.name));

export function getTagBySlug(slug) {
  return tags.find((tag) => tag.slug === slug);
}

export function getPostsByTag(slug) {
  return posts.filter((post) => post.tags.some((tag) => slugifyTag(tag) === slug));
}

export function paginate(items, currentPage = 1, size = pageSize) {
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (page - 1) * size;

  return {
    items: items.slice(start, start + size),
    currentPage: page,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
}

export function getPaginationPages(totalPages) {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}
