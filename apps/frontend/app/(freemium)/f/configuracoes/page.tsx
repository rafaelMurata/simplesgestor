export const dynamic = 'force-dynamic';

export default function FreemiumConfiguracoesPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Configurações da Conta</h1>
      <div className="bg-white rounded-lg shadow border border-blue-100 p-6 max-w-lg">
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value="usuario@exemplo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              id="name"
              type="text"
              value="Usuário Freemium"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plano atual
            </label>
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded font-semibold">
              Freemium
            </span>
          </div>
          <div className="pt-4">
            <a
              href="/planos"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Fazer upgrade de plano
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
