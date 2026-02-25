import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env['JWT_SECRET'] ?? 'dev-secret-change-me',
);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { sub: string; role: string };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  // Admin routes (except /admin/login) — require ADMIN role
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    const payload = await verifyToken(accessToken);
    if (!payload) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    // Non-admin users cannot access admin pages
    if (payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/account/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Admin login page — if already logged in as admin, go to dashboard
  if (pathname === '/admin/login') {
    if (accessToken) {
      const payload = await verifyToken(accessToken);
      if (payload?.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
    return NextResponse.next();
  }

  // Account routes — require GUEST role (admins go to /admin)
  if (pathname.startsWith('/account')) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    const payload = await verifyToken(accessToken);
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Admin users cannot access guest account pages
    if (payload.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // Client login page — if already logged in, redirect to appropriate dashboard
  if (pathname === '/login') {
    if (accessToken) {
      const payload = await verifyToken(accessToken);
      if (payload?.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      if (payload) {
        return NextResponse.redirect(new URL('/account/dashboard', request.url));
      }
    }
    return NextResponse.next();
  }

  // All other routes — public
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/login'],
};
