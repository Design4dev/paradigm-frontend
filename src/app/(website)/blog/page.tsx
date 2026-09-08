import { BlogList } from "@/features/cms/components/BlogList";
import { blogService } from "@/features/cms/services/blog.service";
import { Reveal } from "@/components/ui/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Fleet management guidance from the Paradigm Fleet team.",
};

export default async function BlogPage() {
  const posts = await blogService.list();

  return (
    <section className="container-page py-16 sm:py-24">
      <Reveal className="mb-10 max-w-2xl">
        <p className="text-label-m mb-4 text-primary-red">Blog</p>
        <h1 className="text-display-l">Fleet management, from people who run fleets.</h1>
      </Reveal>
      <BlogList initialPosts={posts} />
    </section>
  );
}
