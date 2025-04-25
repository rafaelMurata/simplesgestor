export default function FreemiumHeader() {
  return (
    <header className="w-full bg-blue-50 border-b border-blue-200 py-4 px-8 flex items-center justify-between">
      <span className="font-bold text-blue-700 text-xl">SimplesGestor Freemium</span>
      <nav>
        <a href="/f/dashboard" className="text-blue-700 hover:underline mx-2">Dashboard</a>
        <a href="/f/relatorios" className="text-blue-700 hover:underline mx-2">Relatórios</a>
        <a href="/f/configuracoes" className="text-blue-700 hover:underline mx-2">Configurações</a>
      </nav>
    </header>
  );
}
