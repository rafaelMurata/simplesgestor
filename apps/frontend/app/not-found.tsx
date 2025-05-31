import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <h1 className="text-6xl font-bold text-purple-700 mb-6">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página não encontrada</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Desculpe, não conseguimos encontrar a página que você está procurando.
      </p>
      <Link href="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
