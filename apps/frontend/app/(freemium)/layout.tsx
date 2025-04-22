// apps/frontend/app/(freemium)/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-static';

export default function FreemiumLayout({
                                         children,
                                       }: {
  children: React.ReactNode
}) {
  const router = useRouter();

  // Observe que isso será executado apenas no lado do cliente
  // A verificação de autenticação real precisaria ser implementada com um hook personalizado
  useEffect(() => {
    // Simulação de verificação - em produção você usaria um hook de autenticação adequado
    const isAuthenticated = localStorage.getItem('auth_token');
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="freemium-layout">
      {children}
    </div>
  )
}
