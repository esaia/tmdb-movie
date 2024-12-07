import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const xsrf = cookieStore.get('XSRF-TOKEN')?.value;
  let user = null;
  // console.log(req.nextUrl.origin);

  const getUser = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: decodeURIComponent(cookieStore.toString()),
          'X-XSRF-TOKEN': `${xsrf}`,
          // host: '192.168.0.103:8000',
          // origin: 'http://192.168.0.103:4040',
          referer: req.nextUrl.origin || 'http://192.168.0.103:4040',
          // referer: 'http://qmovies.net/',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();

      user = data.user;
    } catch (error) {
      console.log('error', error);
    }
  };

  if (
    ['/adminpanel', '/adminpanel/taxonomy', '/adminpanel/archived', '/adminpanel/series'].includes(req.nextUrl.pathname)
  ) {
    await getUser();
    if (!user) return NextResponse.redirect(new URL('/adminpanel/login', req.url));
  }

  if (['/adminpanel/login'].includes(req.nextUrl.pathname)) {
    await getUser();
    if (user) return NextResponse.redirect(new URL('/adminpanel', req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)'],
};
