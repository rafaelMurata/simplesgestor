import '../../../libs/ui/src/lib/global.css'; // Caminho relativo real
export const metadata = {
  title: 'SimplesGestor',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
    <body>{children}</body>
    </html>
  );
}
