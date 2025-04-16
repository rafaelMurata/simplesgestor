export default function PricingPage() {
    return (
      <main className="pricing-container">
        <section className="header">
          <h1>Planos do SimplesGestor</h1>
          <p>Escolha o plano que melhor atende às suas necessidades e comece a organizar suas finanças de forma simples e eficiente.</p>
        </section>
  
        <section className="plans">
          {/* Plano Básico */}
          <div className="plan-card">
            <h2>Plano Básico</h2>
            <p className="price">R$ 29,90 / mês</p>
            <ul>
              <li>Emissão de notas fiscais</li>
              <li>Relatórios mensais</li>
              <li>Controle de receitas e despesas</li>
              <li>Suporte básico</li>
            </ul>
            <a href="/signup" className="btn-primary">Assinar Agora</a>
          </div>
          {/* Plano Premium */}
          <div className="plan-card">
            <h2>Plano Premium</h2>
            <p className="price">R$ 59,90 / mês</p>
            <ul>
              <li>Integrações bancárias</li>
              <li>Suporte prioritário</li>
              <li>Calculadora de impostos</li>
              <li>Relatórios avançados</li>
            </ul>
            <a href="/signup" className="btn-primary">Assinar Agora</a>
          </div>
        </section>
  
        <section className="benefits">
          <h2>Por que escolher o SimplesGestor?</h2>
          <ul>
            <li>Automação de tarefas burocráticas</li>
            <li>Fácil de usar, mesmo sem experiência em contabilidade</li>
            <li>Atualizações automáticas conforme a legislação brasileira</li>
            <li>Suporte em português</li>
          </ul>
        </section>
  
       </main>
    )
}