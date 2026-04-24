import Link from "next/link";
import { ArrowRight, BadgeCheck, Filter, MapPin, Search, Star } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { fetchTaskPosts } from "@/lib/task-data";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";
import { CATEGORY_OPTIONS } from "@/lib/categories";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("listing", {
    path: "/listings",
    title: taskPageMetadata.listing.title,
    description: taskPageMetadata.listing.description,
  });

type ListingsSearchParams = {
  category?: string;
  q?: string;
  location?: string;
};

const textMatch = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const compactText = (value: unknown) => (typeof value === "string" ? value.trim().toLowerCase() : "");

export default async function ListingsPage({ searchParams }: { searchParams?: ListingsSearchParams }) {
  const posts = await fetchTaskPosts("listing", 24, { fresh: true });
  const query = (searchParams?.q || "").trim().toLowerCase();
  const location = (searchParams?.location || "").trim().toLowerCase();
  const activeCategory = (searchParams?.category || "").trim().toLowerCase();
  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const category = compactText((content as any).category);
    const title = compactText(post.title);
    const summary = compactText(post.summary);
    const address = compactText((content as any).address || (content as any).location);

    if (activeCategory && !category.includes(activeCategory)) return false;
    if (query && !(textMatch(title, query) || textMatch(summary, query) || textMatch(category, query))) return false;
    if (location && !textMatch(address, location)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f2f6f1] text-[#102214]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#d3e0d4] bg-[linear-gradient(180deg,#eaf3eb_0%,#f2f6f1_100%)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#c3d5c5] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1f6a3c]">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified Listings
              </p>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-[#112b18]">Business Listings</h1>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#3e6149]">
                Explore trusted local businesses by category, location, and service focus. Built for fast comparison and clear decision-making.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c9dacb] bg-white px-4 py-2 text-sm font-medium text-[#285438]">
                  <MapPin className="h-4 w-4" />
                  Local-first discovery
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c9dacb] bg-white px-4 py-2 text-sm font-medium text-[#285438]">
                  <Star className="h-4 w-4 fill-current" />
                  Quality-focused profiles
                </div>
              </div>
            </div>

            <form action="/listings" className="rounded-[1.7rem] border border-[#cfe0d1] bg-white p-6 shadow-[0_22px_64px_rgba(16,34,20,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5d7866]">Quick filters</p>
              <div className="mt-4 grid gap-3">
                <div className="flex h-11 items-center gap-2 rounded-xl border border-[#d4e2d6] bg-[#f7fbf7] px-3 text-sm text-[#4c6a57]">
                  <Search className="h-4 w-4" />
                  <input
                    name="q"
                    defaultValue={searchParams?.q || ""}
                    placeholder="Search by service name"
                    className="h-full w-full bg-transparent text-[#1d422b] placeholder:text-[#5f7a67] focus:outline-none"
                  />
                </div>
                <input
                  name="location"
                  defaultValue={searchParams?.location || ""}
                  placeholder="City or ZIP code"
                  className="h-11 rounded-xl border border-[#d4e2d6] bg-[#f7fbf7] px-3 text-sm text-[#1d422b] placeholder:text-[#5f7a67]"
                />
                <select
                  name="category"
                  defaultValue={activeCategory || ""}
                  className="h-11 rounded-xl border border-[#d4e2d6] bg-[#f7fbf7] px-3 text-sm text-[#1d422b]"
                >
                  <option value="">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#123f26] px-5 text-sm font-semibold text-white transition hover:bg-[#195632]"
                >
                  <Filter className="h-4 w-4" />
                  Apply filters
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5f7a67]">Directory Feed</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#112b18]">
                {query || location || activeCategory
                  ? `Results ${query ? `for "${query}"` : ""}${location ? `${query ? " " : ""}in "${location}"` : ""}${activeCategory ? `${query || location ? " " : ""}under "${activeCategory}"` : ""}`
                  : "Fresh business listings"}
              </h2>
            </div>
            <Link href="/register" className="inline-flex items-center gap-2 rounded-full border border-[#c8d9cb] bg-white px-4 py-2 text-sm font-semibold text-[#1d4b30] hover:bg-[#eef6ef]">
              List your business
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {filtered.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <TaskPostCard key={post.id} post={post} href={`/listings/${post.slug}`} taskKey="listing" />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.4rem] border border-dashed border-[#c8d9cb] bg-white p-10 text-center text-[#4a6752]">
              No listings found for this filter yet.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
