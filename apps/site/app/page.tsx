"use client";

export default function HomePage() {
  return (
    <main className="home-hero">
      <section className="hero-content">
        <h1>
          Gestão Financeira <span className="highlight">Simples</span> para MEIs e Microempresas
        </h1>
        <p>
          Organize seu fluxo de caixa, emita notas fiscais, calcule impostos e automatize sua rotina financeira com o <strong>SimplesGestor</strong>.
        </p>
        <a href="/login" className="cta-button">
          Experimente Grátis
        </a>
      </section>
      <section className="features">
        <div>
          <h2>Automação Fiscal</h2>
          <p>Geração automática de relatórios e lembretes de impostos.</p>
        </div>
        <div>
          <h2>Emissão de Notas</h2>
          <p>Emita NFS-e em poucos cliques, sem complicação.</p>
        </div>
        <div>
          <h2>Controle Total</h2>
          <p>Veja receitas, despesas e saldo em tempo real, tudo em um só lugar.</p>
        </div>
      </section>
    </main>
  );
}
