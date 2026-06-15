const DEFAULT_PAGES_ORIGIN = 'https://glarysoft-kb.pages.dev';

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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/kb') {
      url.pathname = '/kb/';
      return Response.redirect(url.toString(), 301);
    }

    if (!url.pathname.startsWith('/kb/')) {
      return new Response('Not found', { status: 404 });
    }

    const target = new URL(request.url);
    const pagesOrigin = new URL(getPagesOrigin(env));
    target.protocol = pagesOrigin.protocol;
    target.hostname = pagesOrigin.hostname;
    target.port = pagesOrigin.port;

    const response = await fetch(copyRequest(request, target));
    const headers = new Headers(response.headers);
    headers.set('X-Glarysoft-KB-Proxy', 'cloudflare-worker');

    return new Response(response.body, {
      headers,
      status: response.status,
      statusText: response.statusText,
    });
  },
};
