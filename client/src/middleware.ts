import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const loginUrl = new URL('/auth/login', req.url);
    const token = req.cookies.get('token')?.value;

    if (req.nextUrl.pathname === '/auth/login') {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/contacts',
        '/contacts/create',
        '/contacts/:id',
        '/contacts/:id/edit',
    ],
};
