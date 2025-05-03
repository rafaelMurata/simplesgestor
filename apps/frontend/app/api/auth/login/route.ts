import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'paid';
}

function getRedirectPath(plan: string): string {
  switch (plan) {
    case 'free':
      return '/f/dash';
    case 'paid':
      return '/p/dash';
    default:
      return '/auth/login'; // Fallback to login page
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    if(!process.env.BACKEND_URL){
      throw new Error('BACKEND_URL not defined')
    }

    // Proxy a requisição para o backend (ajuste a URL conforme necessário)
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3333';
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      return new Response(JSON.stringify({ message: data.message }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Set the token in a cookie
    const tokenCookie = serialize('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Store user data in a separate cookie
    const user: User = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      plan: data.user.plan || 'free' // Assuming a default plan
    };

    const userCookie = serialize('user', JSON.stringify(user), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Redirect user based on plan
    const redirectPath = getRedirectPath(user.plan);
    const redirect = NextResponse.redirect(new URL(redirectPath, request.url), 303);
    console.log(redirect)
    redirect.headers.set('Set-Cookie', [tokenCookie, userCookie].join('; '));
    return redirect;
  } catch (error: any) {
    return new Response( // Return a regular response with an error status
      JSON.stringify({ message: error.message || 'Erro ao processar a requisição de login' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
