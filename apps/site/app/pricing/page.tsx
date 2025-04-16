"use client";

import { useState } from "react";


const plans = [
  {
    name: "Básico",
    priceMonth: 29.9,
    priceYear: 299,
    features: [
      "Emissão de notas fiscais",
      "Relatórios mensais",
      "Controle de receitas e despesas",
      "Suporte básico",
    ],
    icon: "💼",
    highlight: false,
  },
  {
    name: "Advanced",
    priceMonth: 44.9,
    priceYear: 449,
    features: [
      "Tudo do Básico",
      "Integrações bancárias",
      "Calculadora de impostos",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
    icon: "🚀",
    highlight: true,
  },
  {
    name: "Premium",
    priceMonth: 59.9,
    priceYear: 599,
    features: [
      "Tudo do Advanced",
      "Gestão multiempresa",
      "Exportação avançada de dados",
      "Consultoria personalizada",
      "Suporte 24/7",
    ],
    icon: "👑",
    highlight: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-12 px-4">
      {/* Header */}
      <section className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
          Planos do SimplesGestor
        </h1>
        <p className="text-lg text-[var(--color-text)]">
          Escolha o plano que melhor atende às suas necessidades e comece a organizar suas finanças de forma simples e eficiente.
        </p>
        <div className="flex justify-center items-center gap-4 mt-6">
          <span className={!annual ? "font-bold text-[var(--color-primary)]" : "text-gray-500"}>
            Mensal
          </span>
          <button
            className={`w-12 h-6 flex items-center bg-gray-200 rounded-full p-1 transition-colors duration-300 ${annual ? "bg-[var(--color-primary)]" : ""}`}
            onClick={() => setAnnual((v) => !v)}
            aria-label="Alternar cobrança anual"
          >
            <span
              className={`h-4 w-4 bg-white rounded-full shadow transform transition-transform duration-300 ${annual ? "translate-x-6" : ""}`}
            />
          </button>
          <span className={annual ? "font-bold text-[var(--color-primary)]" : "text-gray-500"}>
            Anual <span className="text-xs">(2 meses grátis!)</span>
          </span>
        </div>
      </section>

      {/* Planos */}
      <section className="flex flex-col md:flex-row gap-8 justify-center mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex-1 bg-white rounded-xl shadow-md p-8 max-w-md border transition-transform duration-300 ${
              plan.highlight
                ? "border-[var(--color-primary)] scale-105 ring-2 ring-[var(--color-primary)]"
                : "border-[var(--color-primary)]/20"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{plan.icon}</span>
              <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
                {plan.name}
              </h2>
              {plan.highlight && (
                <span className="ml-2 px-2 py-0.5 bg-[var(--color-primary)] text-white text-xs rounded-full">
                  Mais Popular
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-[var(--color-primary-dark)] mb-4">
              R$ {annual ? plan.priceYear : plan.priceMonth}
              <span className="text-base font-normal">
                /{annual ? "ano" : "mês"}
              </span>
            </p>
            <ul className="mb-6 space-y-2 text-[var(--color-text)]">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center">
                  <span className="mr-2">✔️</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="/signup"
              className="inline-block w-full text-center bg-[var(--color-primary)] text-white py-3 rounded-md font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Assinar Agora
            </a>
          </div>
        ))}
      </section>

      {/* Benefícios */}
      <section className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-8">
          Por que escolher o SimplesGestor?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-[var(--color-text)]">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Automação de tarefas burocráticas</h3>
            <p className="text-sm">Deixe a papelada conosco e foque no seu negócio</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Fácil de usar</h3>
            <p className="text-sm">Interface intuitiva mesmo para iniciantes</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Atualizações automáticas</h3>
            <p className="text-sm">Sempre conforme a legislação brasileira</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Suporte em português</h3>
            <p className="text-sm">Equipe especializada pronta para ajudar</p>
          </div>
        </div>
      </section>
    </main>
  );
}
