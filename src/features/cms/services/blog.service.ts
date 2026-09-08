import { getPostBySlug, getPosts } from "@/services/cms/cms.service";

/** Blog-specific shaping on top of the generic CMS content service. */
export const blogService = {
  list: () => getPosts(),
  bySlug: (slug: string) => getPostBySlug(slug),
};
