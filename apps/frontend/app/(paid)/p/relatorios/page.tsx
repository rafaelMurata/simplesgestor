'use client';
export default function PaidRelatoriosPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-purple-800">Relatórios Avançados</h1>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow border border-purple-100">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="date"
            className="p-2 border rounded-lg"
          />
          <select className="p-2 border rounded-lg">
            <option>Tipo de Relatório</option>
            <option>Financeiro</option>
            <option>Desempenho</option>
          </select>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Gerar Relatório
          </button>
        </div>

        {/* Tabela de Relatórios */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-purple-200">
            <thead>
            <tr>
              <th className="px-6 py-3 bg-purple-50 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 bg-purple-50 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 bg-purple-50 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-purple-200">
            {/* Dados dos relatórios */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
