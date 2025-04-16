import Link from 'next/link';

export function Navbar() {
  return (
    <nav>
      <Link href="/pricing">Preços</Link>
      <Link href="https://app.seudominio.com/login">Login</Link>
    </nav>
  )
}
