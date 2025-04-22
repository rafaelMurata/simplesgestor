export const dynamic = 'force-static';

export async function POST(request: Request) {
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

    // Retorna a resposta do backend com o mesmo status
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro na rota de login:', error);
    return new Response(
      JSON.stringify({ message: 'Erro ao processar a requisição de login' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
