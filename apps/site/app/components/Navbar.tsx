import Link from 'next/link';

export function Navbar() {
  return (
    <nav>
      <Link href="/pricing">Preços</Link>
      <Link href={process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:4200'} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
        Acessar Sistema
      </Link>
    </nav>
  )
}
