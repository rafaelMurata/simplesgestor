'use client';

export default function FreemiumDashboardPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Bem-vindo ao SimplesGestor Freemium!</h1>
      <p className="mb-8 text-blue-700">
        Controle suas finanças gratuitamente. Para desbloquear mais funcionalidades, <a href="/planos" className="text-blue-900 underline">conheça nossos planos premium</a>.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow border border-blue-100">
          <h2 className="font-semibold text-blue-700 mb-2">Resumo do mês</h2>
          <p className="text-gray-700">Receitas e despesas básicas do seu negócio.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow border border-blue-100">
          <h2 className="font-semibold text-blue-700 mb-2">Limites do Freemium</h2>
          <ul className="list-disc pl-5 text-blue-700">
            <li>1 projeto ativo</li>
            <li>1 usuário</li>
            <li>1GB de armazenamento</li>
            <li>Suporte por e-mail</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
