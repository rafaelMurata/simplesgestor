import '../../../libs/ui/src/lib/global.css';

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
    <head>
      <meta charSet="utf-8" />
      <title>Todo App</title>
    </head>
    <body className="bg-gray-50">
    {children}
    </body>
    </html>
  )
}
