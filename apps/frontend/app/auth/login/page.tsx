'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const setAuthToken = (token: string) => {
    localStorage.setItem('auth_token', token);
  };

  const isValidEmail = (email: string): boolean => {
    // Simple email validation (can be improved)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    // Basic password validation (can be improved)
    return password.length >= 6;
  };

  const handleLogin = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3333';

    if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }


    if (!isValidEmail(email)) {
      setError('Por favor, insira um e-mail válido ou não vazio.');
      return;
    }
    if (!isValidPassword(password)) {
      setError('A senha deve ter pelo menos 6 caracteres ou não vazia.');
      return;
    }

    setIsLoading(true);
    setError(''); // Clear previous errors

    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }
      setAuthToken(data.token);
      router.push('/f/dashboard');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Sua senha"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link href="/auth/register" className="text-blue-600 hover:text-blue-800">
              Registre-se
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

