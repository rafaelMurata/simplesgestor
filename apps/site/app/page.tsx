import Image from 'next/image';
import BlogCard from './components/BlogCard';
import posts from '../../site/app/data/blog-posts.json';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Seção Hero */}
      <section className="relative h-96">
        <Image
          src="/images/hero.jpg"
          alt="Gestão financeira para MEIs"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4">
            <h1 className="text-4xl font-bold mb-4">
              Gestão Financeira Simplificada para MEIs
            </h1>
            <p className="text-xl">
              Automatize suas tarefas contábeis, emita notas fiscais e mantenha
              o controle total do seu negócio em um só lugar
            </p>
          </div>
        </div>
      </section>

      {/* Seção Posts em Destaque */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Como podemos ajudar seu negócio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
