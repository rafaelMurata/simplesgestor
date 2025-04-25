import Link from 'next/link';

export default function PaidLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Premium */}
      <header className="w-full bg-white border-b border-purple-100 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
          <Link href="/p/dashboard" className="text-2xl font-bold text-purple-700">
            SimplesGestor Premium
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/p/dashboard" className="text-purple-700 hover:text-purple-900 font-medium">
              Dashboard
            </Link>
            <Link href="/p/relatorios" className="text-purple-700 hover:text-purple-900 font-medium">
              Relatórios
            </Link>
            <Link href="/p/exportar-dados" className="text-purple-700 hover:text-purple-900 font-medium">
              Exportar Dados
            </Link>
            <Link href="/p/configuracoes" className="text-purple-700 hover:text-purple-900 font-medium">
              Configurações
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto py-8 px-4">{children}</main>

      {/* Footer Premium */}
      <footer className="w-full bg-white border-t border-purple-100 py-4 text-center text-sm text-purple-700">
        <div className="max-w-7xl mx-auto">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold mr-2">
            PREMIUM
          </span>
          SimplesGestor Premium &copy; {new Date().getFullYear()} •
          <Link href="/suporte" className="ml-2 underline hover:text-purple-900">
            Suporte Prioritário 24/7
          </Link>
        </div>
      </footer>
    </div>
  )
}
