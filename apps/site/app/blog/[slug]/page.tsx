import { notFound } from 'next/navigation';
import posts from '../../../app/data/blog-posts.json';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  return posts.map(post => ({
    slug: post.slug
  }));
}
export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);

  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={450}
        className="w-full h-64 object-cover mb-8 rounded-lg"
      />
      <div className="prose lg:prose-xl">
        {post.content}
      </div>
    </article>
  );
}
