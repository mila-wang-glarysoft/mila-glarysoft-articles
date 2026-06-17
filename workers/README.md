# Articles Proxy Worker

This Worker proxies the public article-library routes to the Cloudflare Pages
deployment for this Astro articles library:

- `glarysoft.com/articles*`
- `glarysoft.com/windows-tips*`
- `glarysoft.com/how-to*`
- `glarysoft.com/hardware*`
- `glarysoft.com/_astro*`
- `glarysoft.com/js*`
- `glarysoft.com/favicon.*`

The Astro app is built for root-relative URLs so the public collection routes
resolve as `/how-to/`, `/windows-tips/`, and `/hardware/`.

## Configure

If the Pages project URL is not `https://glarysoft-howto.pages.dev`, update
`PAGES_ORIGIN` in `wrangler.articles-proxy.jsonc`.

## Deploy

```sh
npm run build
npx wrangler pages deploy dist --project-name glarysoft-howto
npx wrangler deploy --config wrangler.articles-proxy.jsonc
```

After deployment, requests such as these are forwarded to the Pages project:

- `https://www.glarysoft.com/articles/`
- `https://www.glarysoft.com/windows-tips/`
- `https://www.glarysoft.com/how-to/`
- `https://www.glarysoft.com/hardware/`
- `https://www.glarysoft.com/_astro/...`
- `https://www.glarysoft.com/js/buy.json`
