"use client";

import { BlogCard } from "@/features/cms/components/BlogCard";
import { useBlogPosts } from "@/features/cms/hooks/useBlogPosts";
import { SearchIcon } from "@/components/ui/Icons";
import type { BlogPost } from "@/features/cms/types/blog.types";

export function BlogList({ initialPosts }: { initialPosts: BlogPost[] }) {
  const { query, setQuery, posts } = useBlogPosts(initialPosts);

  return (
    <div>
      <div className="focus-within:ring-primary-red mb-8 flex max-w-md items-center gap-2 rounded-[var(--radius-control)] border border-border bg-surface px-4 py-2.5 focus-within:ring-2">
        <SearchIcon className="h-4 w-4 shrink-0 opacity-40" />
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles…"
          className="text-body-m w-full bg-transparent text-primary-black placeholder:text-dark-neutral/40 focus:outline-none"
        />
      </div>

      {posts.length === 0 ? (
        <p className="text-body-m text-dark-neutral/60">No articles match &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
