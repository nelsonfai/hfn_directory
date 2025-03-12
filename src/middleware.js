// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname from the URL
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Check if the request is for the root path
  if (pathname === '/') {
    // Create a new URL for the redirect by changing the pathname
    url.pathname = '/members';
    
    // Return a redirect response
    return NextResponse.redirect(url);
  }

  // For all other paths, continue with the request
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ['/'],
};