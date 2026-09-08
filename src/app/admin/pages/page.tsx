import { getPosts } from "@/services/cms/cms.service";
import Link from "next/link";

export default async function AdminPagesPage() {
  const posts = await getPosts();

  const staticPages = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-heading-l">Pages</h1>
        <p className="text-body-m mt-1 text-dark-neutral/60">
          Every route currently live on the marketing site — no CMS-backed page builder in this prototype, so these
          map directly to files under <code>app/(website)/</code>.
        </p>
      </div>

      <PageTable title="Site Pages" rows={staticPages.map((p) => ({ label: p.label, href: p.href }))} />
      <PageTable
        title="Blog Posts"
        rows={posts.map((post) => ({ label: post.title, href: `/blog/${post.slug}` }))}
      />
    </div>
  );
}

function PageTable({ title, rows }: { title: string; rows: { label: string; href: string }[] }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
      <h2 className="text-heading-m mb-4">{title}</h2>
      <ul className="flex flex-col">
        {rows.map((row) => (
          <li key={row.href} className="flex items-center justify-between border-b border-border py-3 last:border-none">
            <span className="text-body-m text-primary-black">{row.label}</span>
            <Link href={row.href} className="focus-ring text-label-m rounded text-primary-red hover:underline">
              View →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
