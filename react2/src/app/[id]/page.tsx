import LikeButton from '@/ui/like-button';
import { getPost } from '@/lib/posts';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);
  if (!post) {
    notFound();
  }
  return (
    <div>
      <main>
        <h1>{post.title}</h1>
        {/*  */}
        <LikeButton likes={post.likes}/>
      </main>
    </div>
  );
}