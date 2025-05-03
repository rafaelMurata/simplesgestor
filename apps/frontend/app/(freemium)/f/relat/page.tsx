export default function FreemiumRelatoriosPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Relatórios Freemium</h1>
      <p className="mb-8 text-blue-700">
        Veja um resumo simples das suas receitas e despesas. Para relatórios avançados, <a href="/planos" className="text-blue-900 underline">conheça nossos planos premium</a>.
      </p>
      <div className="bg-white rounded-lg shadow border border-blue-100 p-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Resumo do mês</h2>
        <ul className="text-gray-700 space-y-2">
          <li>
            <span className="font-medium text-blue-700">Receitas:</span> R$ 0,00
          </li>
          <li>
            <span className="font-medium text-blue-700">Despesas:</span> R$ 0,00
          </li>
          <li>
            <span className="font-medium text-blue-700">Saldo:</span> R$ 0,00
          </li>
        </ul>
        <div className="mt-6 text-sm text-blue-700">
          <span className="inline-block bg-blue-50 border border-blue-200 rounded px-3 py-1">
            Relatórios detalhados e exportação disponíveis apenas nos planos pagos.
          </span>
        </div>
      </div>
    </section>
  );
}
