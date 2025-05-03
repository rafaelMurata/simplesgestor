'use client';
export default function PaidDashboardPage() {
  return (
    <section className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow border border-purple-100">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">Dashboard Premium</h1>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-700">Receita Mensal</h3>
            <p className="text-2xl font-bold">R$ 25.430,00</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-700">Clientes Ativos</h3>
            <p className="text-2xl font-bold">1.234</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-700">Conversão</h3>
            <p className="text-2xl font-bold">15.8%</p>
          </div>
        </div>

        {/* Gráfico Principal */}
        <div className="bg-white p-6 rounded-lg border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Desempenho Mensal</h2>
          <div className="h-64 bg-purple-50 rounded-lg">
            {/* Espaço para gráfico (ex: Chart.js) */}
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-700 mb-4">Atividades Recentes</h3>
            {/* Lista de atividades */}
          </div>
          <div className="bg-white p-6 rounded-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-700 mb-4">Dicas Premium</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Exporte relatórios detalhados
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Acesso a análise preditiva
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
