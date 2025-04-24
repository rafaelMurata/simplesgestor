import { serialize } from 'cookie';
export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

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
    const token = data.token;
    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Return the user and set the cookie
    return new Response(JSON.stringify({ user: data.user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie,
      },
    });
  } catch (error: any) {
    return new Response(
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
