'use client';
export default function PaidConfiguracoesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-purple-800">Configurações Premium</h1>

      <div className="bg-white p-6 rounded-lg shadow border border-purple-100">
        {/* Seção de Conta */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Conta</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-700">Email</label>
              <input
                type="email"
                value="premium@empresa.com"
                className="mt-1 p-2 border rounded-lg w-full bg-gray-100"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700">Plano Atual</label>
              <div className="mt-1 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg">
                Plano Premium - R$ 299/mês
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Notificações */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Notificações</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded text-purple-600" />
              <span>Alertas de Pagamento</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded text-purple-600" defaultChecked />
              <span>Atualizações do Sistema</span>
            </label>
          </div>
        </div>

        {/* Seção de Cobrança */}
        <div>
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Histórico de Cobrança</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-purple-200">
              <thead>
              <tr>
                <th className="px-6 py-3 bg-purple-50 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 bg-purple-50 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 bg-purple-50 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
              </thead>
              <tbody>
              {/* Histórico de pagamentos */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botão de Upgrade */}
        <div className="mt-8">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
            Upgrade para Plano Corporativo
          </button>
        </div>
      </div>
    </section>
  );
}
