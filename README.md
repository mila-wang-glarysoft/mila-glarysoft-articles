# Glarysoft How-To Articles

Astro content library for Glarysoft articles, product guides, troubleshooting
notes, and guest post submissions.

## Local Development

```sh
npm install
npm run dev
```

The site is built with `base: '/articles'`, so production URLs resolve under
`https://www.glarysoft.com/articles/`.

## Build

```sh
npm run build
```

The production output is written to `dist/`.

## Cloudflare Deploy

Deploy the Pages site:

```sh
npx wrangler pages deploy dist --project-name glarysoft-howto
```

Deploy the proxy Worker for the public Glarysoft routes:

```sh
npx wrangler deploy --config wrangler.articles-proxy.jsonc
```

## Guest Posts

The guest post page lives at `/articles/guest-post/`. It opens a prefilled
email submission to Glarysoft support, which keeps the static Pages deployment
simple while still giving users a clear submission path.
