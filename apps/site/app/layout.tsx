import '../../../libs/ui/src/lib/global.css';
import { NavbarClient } from './components/NavbarClient';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
    <head>
      <title>SimplesGestor</title>
    </head>
    <body>
    <NavbarClient
      logo={<span className="logo">SimplesGestor</span>}
      links={[
        { label: 'Início', href: '/' },
        { label: 'Preços', href: '/pricing' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contato', href: '/contact' }
      ]}
      rightContent={
        <a
          href={process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:4201/auth/login'}
          className="login-button"
        >
          Entrar
        </a>
      }
    />
    {children}
    </body>
    </html>
  );
}
