import '../../../libs/ui/src/lib/global.css';

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
    <head>
      <title>SimplesGestor</title>
    </head>
    <body className="bg-gray-50">
    {children}
    </body>
    </html>
  )
}
