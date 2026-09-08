import { blogService } from "@/features/cms/services/blog.service";
import { getPosts } from "@/services/cms/cms.service";
import { ChevronLeftIcon } from "@/components/ui/Icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogService.bySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await blogService.bySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container-page max-w-3xl py-16 sm:py-24">
      <Link href="/blog" className="focus-ring text-label-m mb-8 inline-flex items-center gap-1.5 rounded text-dark-neutral/70 hover:text-primary-red">
        <ChevronLeftIcon className="h-4 w-4" />
        Back to Blog
      </Link>

      <p className="text-caption-s mb-3 text-dark-neutral/50">
        {new Date(post.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        {" · "}
        {post.readMinutes} min read · {post.author}
      </p>
      <h1 className="text-display-l mb-8">{post.title}</h1>

      <div className="flex flex-col gap-5">
        {post.content.map((paragraph, index) => (
          <p key={index} className="text-body-l text-dark-neutral/80">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
