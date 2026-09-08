import type { BlogPost } from "@/features/cms/types/blog.types";
import Link from "next/link";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="focus-ring group flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-6 transition-[transform,box-shadow] duration-[var(--duration-micro)] ease-[var(--ease-out-standard)] hover:-translate-y-1 hover:shadow-lg"
    >
      <p className="text-caption-s text-dark-neutral/50">
        {new Date(post.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        {" · "}
        {post.readMinutes} min read
      </p>
      <h3 className="text-heading-m text-primary-black">{post.title}</h3>
      <p className="text-body-m clamp-2 text-dark-neutral/65">{post.excerpt}</p>
      <span className="text-label-m mt-auto text-primary-red">Read Article →</span>
    </Link>
  );
}
