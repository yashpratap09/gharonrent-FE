import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;
  
  // Add pathname to headers for metadata generation
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return response;
  }

  // Define static routes that should not be treated as property slugs
  const staticRoutes = [
    '/about',
    '/contact',
    '/login',
    '/signup',
    '/profile',
    '/dashboard',
    '/pricing',
    '/privacy',
    '/terms',
    '/refund',
    '/add-property',
    '/properties',
    '/search', // ensure /search is always static
    '/search/' // also treat /search/ as static
  ];

  // Check if the pathname is a static route (handle /search and /search/ exactly)
  const isStaticRoute = staticRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
    || (route === '/search' && (pathname === '/search' || pathname === '/search/'))
  );

  // If it's not a static route and not the home page, it might be a property slug
  // This ensures /search and /search/ are never treated as property slugs
  if (!isStaticRoute && pathname !== '/' && pathname.split('/').length === 2) {
    // This is potentially a property slug, let it pass through
    // The dynamic route will handle it
  }

  // Protected routes that require authentication
  const protectedRoutes = ['/add-property', '/profile', '/my-properties', '/favorites'];
  
  // Auth routes that should redirect if already authenticated
  const authRoutes = ['/login', '/signup'];

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // If trying to access protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access auth routes with token, redirect to home
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};