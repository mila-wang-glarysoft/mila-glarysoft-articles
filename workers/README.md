# KB Proxy Worker

This Worker proxies `glarysoft.com/kb*` and `www.glarysoft.com/kb*` to the
Cloudflare Pages deployment for this Astro Knowledge Base.

The proxy preserves the `/kb` path prefix. Keep `base: '/kb'` in
`astro.config.mjs` so Astro assets, public files, and internal links resolve as
`/kb/...`.

## Configure

If the Pages project URL is not `https://glarysoft-kb.pages.dev`, update
`PAGES_ORIGIN` in `wrangler.kb-proxy.jsonc`.

## Deploy

```sh
npx wrangler deploy --config wrangler.kb-proxy.jsonc
```

After deployment, requests such as these are forwarded to the Pages project:

- `https://www.glarysoft.com/kb/`
- `https://www.glarysoft.com/kb/glary-utilities/`
- `https://www.glarysoft.com/kb/_astro/...`
- `https://www.glarysoft.com/kb/js/buy.json`
