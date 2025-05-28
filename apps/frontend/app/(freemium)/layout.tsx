"use client";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function FreemiumLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear cookies
        deleteCookie('token', { path: '/' });
        deleteCookie('user', { path: '/' });

        // Redirect to login
        router.push('/auth/login');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Logout failed');
      }
    } catch (error: any) {
      alert(error.message || 'Error processing logout request');
    }

  };
  const handleLogoutClick = async () => {
    await handleLogout()
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
          <a href="/apps/frontend/public" className="text-2xl font-bold text-blue-700 tracking-tight">SimplesGestor</a>
          <nav className="space-x-6 flex items-center">
            <a href="/f/dashboard" className="text-blue-700 hover:text-blue-900 font-medium">Dashboard</a>
            <a href="/f/relatorios" className="text-blue-700 hover:text-blue-900 font-medium">Relatórios</a>
            <a href="/f/configuracoes" className="text-blue-700 hover:text-blue-900 font-medium">Configurações</a>
            <a href="/planos" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded transition font-semibold">Upgrade</a>
            <button
              onClick={handleLogoutClick}
              className="ml-4 px-4 py-1 rounded bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-semibold transition"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-4xl mx-auto py-8 px-4">{children}</main>
      <footer className="w-full bg-white border-t border-blue-100 py-4 text-center text-sm text-blue-700">
        SimplesGestor Freemium &copy; {new Date().getFullYear()} — <a href="/planos" className="underline hover:text-blue-900">Conheça nossos planos premium</a>
      </footer>
    </div>
  );
}
