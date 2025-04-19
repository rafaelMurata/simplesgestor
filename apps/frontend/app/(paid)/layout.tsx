export default function PaidLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-purple-100 p-4">
        <h2 className="text-xl font-bold">Premium</h2>
        <nav>{/* Links de navegação */}</nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
