const BLOCKED_HOSTS = new Set(['glarysoft-howto.pages.dev']);

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (!BLOCKED_HOSTS.has(url.hostname)) {
    return context.next();
  }

  if (url.pathname === '/robots.txt') {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex, nofollow');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
