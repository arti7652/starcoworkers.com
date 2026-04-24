import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Filter, Search } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <div className="min-h-screen bg-[#f2f6f1] text-[#102214]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#d3e0d4] bg-[linear-gradient(180deg,#eaf3eb_0%,#f2f6f1_100%)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#c3d5c5] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1f6a3c]">
              <Compass className="h-3.5 w-3.5" />
              Smart Discovery
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-[#112b18]">Search</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#3e6149]">
              Find businesses and listings quickly using keyword, category, and content filters.
            </p>

            <form action="/search" className="mt-7 grid gap-3 rounded-[1.7rem] border border-[#cfe0d1] bg-white p-4 shadow-[0_22px_64px_rgba(16,34,20,0.08)] md:grid-cols-[1.2fr_0.9fr_0.9fr_auto]">
              <input type="hidden" name="master" value="1" />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4b6956]" />
                <Input
                  name="q"
                  defaultValue={query}
                  placeholder="Search business, service, or keyword"
                  className="h-11 border-[#d4e2d6] bg-[#f7fbf7] pl-9 text-[#13341f]"
                />
              </div>
              <Input
                name="category"
                defaultValue={category}
                placeholder="Category filter"
                className="h-11 border-[#d4e2d6] bg-[#f7fbf7] text-[#13341f]"
              />
              <Input
                name="task"
                defaultValue={task}
                placeholder="Type filter"
                className="h-11 border-[#d4e2d6] bg-[#f7fbf7] text-[#13341f]"
              />
              <Button type="submit" className="h-11 bg-[#123f26] text-white hover:bg-[#195632]">
                <Filter className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5f7a67]">Results</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#112b18]">
                {query ? `Results for "${query}"` : "Popular searchable listings"}
              </h2>
            </div>
            <Link href="/listings" className="inline-flex items-center gap-2 rounded-full border border-[#c8d9cb] bg-white px-4 py-2 text-sm font-semibold text-[#1d4b30] hover:bg-[#eef6ef]">
              Browse Listings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {results.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => {
                const task = getPostTaskKey(post);
                const href = task ? buildPostUrl(task, post.slug) : `/posts/${post.slug}`;
                return <TaskPostCard key={post.id} post={post} href={href} />;
              })}
            </div>
          ) : (
            <div className="rounded-[1.4rem] border border-dashed border-[#c8d9cb] bg-white p-10 text-center text-[#4a6752]">
              No matching listings found yet.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
