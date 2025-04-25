export default function FreemiumFooter() {
  return (
    <footer className="w-full bg-blue-50 border-t border-blue-200 py-4 px-8 text-center text-sm text-blue-700 mt-8">
      SimplesGestor Freemium &copy; {new Date().getFullYear()} - <a href="/planos" className="underline hover:text-blue-900">Conheça nossos planos premium</a>
    </footer>
  );
}
