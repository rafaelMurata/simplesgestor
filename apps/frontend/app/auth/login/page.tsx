'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, insira um e-mail válido ou não vazio.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres ou não vazia.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
      }
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6 ">Login</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Sua senha"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="text-center text-gray-600 mt-4">
          Não tem uma conta?{' '}
          <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Registre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
