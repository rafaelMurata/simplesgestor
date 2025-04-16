// libs/ui/src/lib/ui.tsx
import React from 'react';

// Exemplo: exportando um botão simples
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // Você pode adicionar classes CSS globais ou específicas aqui se desejar
  return <button {...props} />;
}

// Remova ou modifique o componente 'Ui' padrão se não precisar dele
// export function Ui() { ... }
// export default Ui;
