const DEFAULT_PAGES_ORIGIN = 'https://glarysoft-articles.pages.dev';
const ROOT_LIBRARY_PATHS = ['/windows-tips', '/how-to', '/hardware'];
const ROOT_ASSET_PATHS = ['/_astro', '/js', '/favicon.ico', '/favicon.svg'];
const PAGED_PATH_PATTERN = /^(.+)\/page\/(\d+)\/?$/;

function getPagesOrigin(env) {
  return (env.PAGES_ORIGIN || DEFAULT_PAGES_ORIGIN).replace(/\/+$/, '');
}

function copyRequest(request, targetUrl) {
  const headers = new Headers(request.headers);
  headers.set('X-Forwarded-Host', new URL(request.url).host);
  headers.set('X-Forwarded-Proto', 'https');
  headers.delete('host');

  return new Request(targetUrl, {
    body: request.body,
    cf: request.cf,
    headers,
    method: request.method,
    redirect: request.redirect,
  });
}

function redirectLegacyPagedPath(url) {
  const match = url.pathname.match(PAGED_PATH_PATTERN);
  if (!match) return null;

  const [, basePath, pageNumber] = match;
  url.pathname = `${basePath}/${pageNumber}/`;
  return Response.redirect(url.toString(), 301);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const rootLibraryPath = ROOT_LIBRARY_PATHS.find(
      (path) => url.pathname === path || url.pathname.startsWith(`${path}/`)
    );
    const rootAssetPath = ROOT_ASSET_PATHS.find(
      (path) => url.pathname === path || url.pathname.startsWith(`${path}/`)
    );

    if (url.pathname === '/articles') {
      url.pathname = '/articles/';
      return Response.redirect(url.toString(), 301);
    }

    const legacyPagedRedirect = redirectLegacyPagedPath(url);
    if (legacyPagedRedirect) return legacyPagedRedirect;

    if (rootLibraryPath && url.pathname === rootLibraryPath) {
      url.pathname = `${rootLibraryPath}/`;
      return Response.redirect(url.toString(), 301);
    }

    if (!url.pathname.startsWith('/articles/') && !rootLibraryPath && !rootAssetPath) {
      return new Response('Not found', { status: 404 });
    }

    const target = new URL(request.url);
    const pagesOrigin = new URL(getPagesOrigin(env));
    target.protocol = pagesOrigin.protocol;
    target.hostname = pagesOrigin.hostname;
    target.port = pagesOrigin.port;
    target.pathname = rootLibraryPath || rootAssetPath
      ? url.pathname
      : url.pathname.replace(/^\/articles(?=\/|$)/, '') || '/';

    const response = await fetch(copyRequest(request, target));
    const headers = new Headers(response.headers);
    headers.set('X-Glarysoft-Articles-Proxy', 'cloudflare-worker');

    return new Response(response.body, {
      headers,
      status: response.status,
      statusText: response.statusText,
    });
  },
};
