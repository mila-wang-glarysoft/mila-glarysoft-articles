import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { marked } from 'marked';

const categoryDefinitions = {
  'clean-up-repair': {
    name: 'Clean Up & Repair',
    description: 'Windows cleanup, repair, and maintenance tutorials.',
    order: 10,
  },
  'cleanup-repair': {
    name: 'Clean Up & Repair',
    description: 'Windows cleanup, repair, and maintenance tutorials.',
    order: 11,
  },
  'optimize-improve': {
    name: 'Optimize & Improve',
    description: 'Windows performance, startup, and optimization tutorials.',
    order: 20,
  },
  'privacy-security': {
    name: 'Privacy & Security',
    description: 'Windows privacy, security, and protection tutorials.',
    order: 30,
  },
  'files-folders': {
    name: 'Files & Folders',
    description: 'File management, backup, recovery, and organization tutorials.',
    order: 40,
  },
  'system-tools': {
    name: 'System Tools',
    order: 50,
    description: 'Windows tools, diagnostics, monitoring, and configuration tutorials.',
  },
};

const baseUrl = import.meta.env?.BASE_URL || '/';
const basePath = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
const articleCollectionSlug = 'how-to';
const articleCollectionDefinitions = {
  'how-to': 'How To',
  'windows-tips': 'Windows Tips',
  hardware: 'Hardware',
};

const contentRoot = path.resolve(process.cwd(), 'content');
const contentPostRoots = ['how-to', 'windows-tips', 'hardware', 'posts'];

function readMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) return readMarkdownFiles(entryPath);
    if (!entry.isFile() || !entry.name.endsWith('.md')) return [];

    const relativePath = path
      .relative(process.cwd(), entryPath)
      .split(path.sep)
      .join('/');

    return [[`../../${relativePath}`, fs.readFileSync(entryPath, 'utf8')]];
  });
}

const rawPostModules = Object.fromEntries(
  contentPostRoots.flatMap((root) => readMarkdownFiles(path.join(contentRoot, root)))
);

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

export const pageSize = 72;

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
  if (articleCollectionDefinitions[slug]) {
    return withBase(`${slug}/`);
  }

  const definition = getCategoryDefinition(slug);
  return definition.parentSlug
    ? withBase(`${articleCollectionSlug}/${definition.parentSlug}/${slug}/`)
    : withBase(`${articleCollectionSlug}/${slug}/`);
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  return `${monthLabels[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getRawBody(raw) {
  return raw.replace(/^---[\s\S]*?---\s*/, '');
}

function getFrontmatter(raw) {
  const match = raw.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) return {};
  return yaml.load(match[1]) || {};
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

function stripInlineMarkdown(value = '') {
  return decodeEntities(value)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~`]+/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\\\./g, '.')
    .replace(/\s+/g, ' ')
    .trim();
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

      const cleanText = stripInlineMarkdown(text);
      if (!cleanText) return;

      headings.push({
        id: slugify(cleanText),
        text: cleanText,
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

function getCategorySlugFromPath(sourcePath) {
  const match = sourcePath.match(/content\/(?:how-to\/)?([^/]+)\//);
  const slug = match?.[1] || '';
  return categoryDefinitions[slug] || articleCollectionDefinitions[slug]
    ? slug
    : 'knowledge-base';
}

function getPrimaryCategory(frontmatter, sourcePath) {
  const category = frontmatter.category || frontmatter.categories;
  if (Array.isArray(category)) return category[0] || 'knowledge-base';
  return category || getCategorySlugFromPath(sourcePath);
}

function getCategoryDefinition(slug) {
  return categoryDefinitions[slug] || {
    name: titleize(slug),
    description: `${titleize(slug)} articles from Glarysoft.`,
    order: 1000,
  };
}

function normalizeList(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function normalizeImagePath(value) {
  if (!value) return '';
  if (value.startsWith('/uploads/')) return withBase(`articles${value}`);
  if (/^(https?:)?\/\//.test(value) || value.startsWith('/')) return value;
  return withBase(value);
}

function getSlugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '');
}

function getCollectionSlugFromPath(sourcePath) {
  const match = sourcePath.match(/content\/([^/]+)\//);
  const sourceCollection = match?.[1] || articleCollectionSlug;
  return articleCollectionDefinitions[sourceCollection] ? sourceCollection : articleCollectionSlug;
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

function getAuthor(frontmatter) {
  const author = frontmatter.author || frontmatter.authors || '';
  if (Array.isArray(author)) return author[0] || '';
  return author;
}

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const rawText = tokens
        .map((token) => token.raw || token.text || '')
        .join('');

      return `<h${depth} id="${slugify(stripInlineMarkdown(rawText))}">${text}</h${depth}>\n`;
    },
    image({ href, title, text }) {
      const src = normalizeImagePath(href);
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';

      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(text || '')}"${titleAttr}>`;
    },
  },
});

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseShortcodeAttributes(value = '') {
  const attributes = {};
  const attributePattern = /([A-Za-z][\w-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s]+))/g;
  let match;

  while ((match = attributePattern.exec(value)) !== null) {
    attributes[match[1]] = match[2] ?? match[3] ?? match[4] ?? '';
  }

  return attributes;
}

function isSafeHref(value = '') {
  return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(value.trim());
}

export function renderNofollowLinks(markdown = '') {
  return markdown.replace(/::nofollow-link\{([^}\n]+)\}/g, (shortcode, rawAttributes) => {
    const attributes = parseShortcodeAttributes(rawAttributes);
    const url = (attributes.url || attributes.href || '').trim();
    const text = attributes.text || attributes.label || url;
    const shouldOpenNewTab = attributes.newTab !== 'false';

    if (!url || !text || !isSafeHref(url)) return escapeHtml(text || shortcode);

    const target = shouldOpenNewTab ? ' target="_blank"' : '';
    const rel = shouldOpenNewTab
      ? ' rel="nofollow noopener noreferrer"'
      : ' rel="nofollow"';

    return `<a href="${escapeHtml(url)}"${rel}${target}>${escapeHtml(text)}</a>`;
  });
}

export function renderPostHtml(post) {
  return marked
    .parse(renderNofollowLinks(post.body || ''))
    .replace(/src="\/uploads\//g, `src="${withBase('articles/uploads/')}`);
}

export const posts = Object.entries(rawPostModules)
  .map(([path, raw]) => {
    const frontmatter = getFrontmatter(raw);
    const slug = frontmatter.slug || getSlugFromPath(path);
    const collectionSlug = getCollectionSlugFromPath(path);
    const categorySlug = getPrimaryCategory(frontmatter, path);
    const categoryInfo = getCategoryDefinition(categorySlug);
    const author = decodeEntities(getAuthor(frontmatter));
    const authorSlug = author ? slugify(author) : '';

    return {
      ...frontmatter,
      slug,
      title: decodeEntities(frontmatter.title),
      category: categoryInfo.name,
      collectionSlug,
      collectionName: articleCollectionDefinitions[collectionSlug],
      author,
      authorSlug,
      authorHref: authorSlug ? withBase(`${collectionSlug}/author/${authorSlug}/`) : '',
      tags: normalizeList(frontmatter.tags).map(decodeEntities),
      body: getRawBody(raw),
      excerpt: getExcerpt(raw, frontmatter),
      headings: getHeadings(raw),
      href: withBase(`${collectionSlug}/${slug}/`),
      sourcePath: path,
      categorySlug,
      categoryHref: getCategoryHref(categorySlug),
      dateLabel: formatDate(frontmatter.date),
      featured_image: normalizeImagePath(
        frontmatter.featured_image || frontmatter.coverImage
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
    (post) =>
      post.collectionSlug === articleCollectionSlug &&
      (post.categorySlug === slug || childSlugs.includes(post.categorySlug))
  );
}

export function getPostsByCategory(category) {
  return posts.filter(
    (post) =>
      post.collectionSlug === articleCollectionSlug &&
      (post.category === category ||
        post.categorySlug === category ||
        getCategoryDefinition(post.categorySlug).parentSlug === category)
  );
}

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getRelatedPosts(currentSlug, limit = 3) {
  const currentPost = posts.find((post) => post.slug === currentSlug);

  return posts
    .filter(
      (post) =>
        post.slug !== currentSlug &&
        (!currentPost || post.collectionSlug === currentPost.collectionSlug)
    )
    .slice(0, limit);
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

export const authors = Array.from(
  posts
    .filter((post) => post.author && post.authorSlug)
    .reduce((authorMap, post) => {
      const existing = authorMap.get(post.authorSlug);
      authorMap.set(post.authorSlug, {
        name: existing?.name || post.author,
        slug: post.authorSlug,
        href: post.authorHref,
        postCount: (existing?.postCount || 0) + 1,
      });
      return authorMap;
    }, new Map())
    .values()
).sort((a, b) => a.name.localeCompare(b.name));

export function getAuthorBySlug(slug) {
  return authors.find((author) => author.slug === slug);
}

export function getPostsByAuthor(slug) {
  return posts.filter((post) => post.authorSlug === slug);
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

export function getPaginationPages(totalPages, currentPage = 1) {
  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages]);
  for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
    if (page > 1 && page < totalPages) pages.add(page);
  }

  const sortedPages = Array.from(pages).sort((a, b) => a - b);
  return sortedPages.flatMap((page, index) => {
    const previous = sortedPages[index - 1];
    if (previous && page - previous > 1) return ['ellipsis', page];
    return [page];
  });
}
