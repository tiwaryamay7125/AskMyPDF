import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = req.nextUrl;

    if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/file'))) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    if (token && (pathname === '/signin')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/file/:path*', '/signin', '/signup'],
};
