import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const loginUrl = new URL('/login', req.url);
    const token = req.cookies.get('token')?.value;  

    if (!token) {
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/features/contacts',
        '/features/contacts/create',
        '/features/contacts/:id',
        '/features/contacts/:id/edit',
    ],
};
