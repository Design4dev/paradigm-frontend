"use client";

import { useDebounce } from "@/hooks/useDebounce";
import type { BlogPost } from "@/features/cms/types/blog.types";
import { useMemo, useState } from "react";

/** Client-side search-as-you-type over a server-fetched post list. */
export function useBlogPosts(initialPosts: BlogPost[]) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);

  const posts = useMemo(() => {
    const term = debouncedQuery.trim().toLowerCase();
    if (!term) return initialPosts;
    return initialPosts.filter(
      (post) => post.title.toLowerCase().includes(term) || post.excerpt.toLowerCase().includes(term)
    );
  }, [initialPosts, debouncedQuery]);

  return { query, setQuery, posts };
}
