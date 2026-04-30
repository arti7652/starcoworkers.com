import Link from 'next/link'
import { ArrowRight, BadgeCheck, Building2, Clock3, Filter, MapPinned, Search, ShieldCheck, Star } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'

export const HOME_PAGE_OVERRIDE_ENABLED = false

const featuredListings = [
  {
    title: 'GreenWave Solar Solutions',
    category: 'Solar Installation',
    location: 'San Diego, California',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1611365892117-00d8b4bd9a8e?w=1200&h=900&fit=crop',
    href: '/listings',
  },
  {
    title: 'Metro Roofing & Exterior',
    category: 'Roofing Services',
    location: 'Austin, Texas',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=1200&h=900&fit=crop',
    href: '/listings',
  },
  {
    title: 'BlueGrid EV Chargers',
    category: 'EV Charging Installer',
    location: 'Portland, Oregon',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=900&fit=crop',
    href: '/listings',
  },
]

const categories = [
  'Home Services',
  'Solar & Energy',
  'Repairs & Maintenance',
  'Real Estate',
  'Health & Wellness',
  'Automotive',
]

const faq = [
  {
    q: 'How do businesses get verified?',
    a: 'Profiles include documentation checks, contact validation, and active listing review before the verified badge appears.',
  },
  {
    q: 'Can I save listings for later?',
    a: 'Yes. Sign in and bookmark listings. Your saved items remain available on your account dashboard.',
  },
  {
    q: 'Do you support multiple locations for one company?',
    a: 'Yes. Businesses can publish one profile and add multiple service areas with separate business details.',
  },
]

export async function HomePageOverride() {
  return (
    <div className="min-h-screen bg-[#f2f6f1] text-[#102214]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[#d5e2d5] bg-[linear-gradient(180deg,#e5efe6_0%,#f2f6f1_70%)]">
          <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.35),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(16,185,129,0.28),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b8cfba] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1f6a3c]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified Business Directory
              </div>
              <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-tight tracking-[-0.04em] text-[#112b18] sm:text-6xl">
                Find trusted local businesses and book faster.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-8 text-[#33563f]">
                Discover services with clear ratings, real location details, and verified profiles. Built for customers who want quick comparisons without noisy feeds.
              </p>

              <form action="/listings" className="mt-8 grid gap-3 rounded-[1.6rem] border border-[#cfe0d1] bg-white p-3 shadow-[0_20px_60px_rgba(18,43,24,0.08)] md:grid-cols-[1.1fr_0.85fr_auto]">
                <div className="flex h-12 items-center gap-2 rounded-xl border border-[#dce8dd] px-3 text-sm text-[#4f6b56]">
                  <Search className="h-4 w-4" />
                  <input
                    name="q"
                    placeholder="Search service or business"
                    className="h-full w-full bg-transparent text-[#244734] placeholder:text-[#5f7a67] focus:outline-none"
                  />
                </div>
                <div className="flex h-12 items-center gap-2 rounded-xl border border-[#dce8dd] px-3 text-sm text-[#4f6b56]">
                  <MapPinned className="h-4 w-4" />
                  <input
                    name="location"
                    placeholder="City or ZIP code"
                    className="h-full w-full bg-transparent text-[#244734] placeholder:text-[#5f7a67] focus:outline-none"
                  />
                </div>
                <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#123f26] px-5 text-sm font-semibold text-white transition hover:bg-[#195632]">
                  Find Listings
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {['10K+ Listings', '100+ Categories', '98% Profile Accuracy'].map((item) => (
                  <div key={item} className="rounded-2xl border border-[#d3e1d5] bg-white px-4 py-3 text-sm font-semibold text-[#1d4528]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[#c9ddcb] bg-[#183624] p-3 shadow-[0_26px_80px_rgba(16,34,20,0.3)]">
              <div className="relative h-full min-h-[320px] overflow-hidden rounded-[1.45rem]">
                <ContentImage
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&h=1200&fit=crop"
                  alt="Featured business listing"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/75" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-100">Featured Listing</p>
                  <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-[-0.03em]">GreenRoof Energy House</h2>
                  <p className="mt-2 text-sm text-emerald-50">Solar roof installation and maintenance with 5-year service warranty.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#54735f]">Top Picks</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#112b18]">Popular businesses near you</h2>
            </div>
            <Link href="/listings" className="text-sm font-semibold text-[#1f6a3c] hover:underline">View all listings</Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <Link key={listing.title} href={listing.href} className="overflow-hidden rounded-[1.6rem] border border-[#d2e1d4] bg-white shadow-[0_14px_40px_rgba(14,34,19,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(14,34,19,0.12)]">
                <div className="relative h-48">
                  <ContentImage src={listing.image} alt={listing.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5b7a63]">{listing.category}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#153320]">{listing.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-sm text-[#476652]">
                    <span>{listing.location}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#1f6a3c]">
                      <Star className="h-4 w-4 fill-current" />
                      {listing.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-[#d3e0d4] bg-white/80">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-[1.6rem] border border-[#d7e2d8] bg-[#f6faf6] p-6">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#173723]">Browse by category</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {categories.map((item) => (
                    <Link key={item} href="/listings" className="flex items-center justify-between rounded-xl border border-[#d5e3d6] bg-white px-4 py-3 text-sm font-medium text-[#20452d] hover:bg-[#eef6ef]">
                      {item}
                      <ArrowRight className="h-4 w-4 text-[#2a5e3c]" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-[#d7e2d8] bg-[#f6faf6] p-6">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#173723]">Why people trust this directory</h3>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-[#3a5e47]">
                  <li className="flex gap-3"><BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-[#1f6a3c]" />Verified listings with updated contact details.</li>
                  <li className="flex gap-3"><Clock3 className="mt-1 h-4 w-4 shrink-0 text-[#1f6a3c]" />Fast comparison cards so users decide quicker.</li>
                  <li className="flex gap-3"><Filter className="mt-1 h-4 w-4 shrink-0 text-[#1f6a3c]" />Simple filters for location, rating, and service type.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#587562]">Questions</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#112b18]">Everything you need before listing or booking</h3>
            </div>
            <div className="space-y-3">
              {faq.map((item) => (
                <div key={item.q} className="rounded-2xl border border-[#d5e2d6] bg-white px-5 py-4">
                  <p className="font-semibold text-[#183623]">{item.q}</p>
                  <p className="mt-2 text-sm leading-7 text-[#486652]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#d5e1d6] bg-[linear-gradient(180deg,#e8f2e9_0%,#dbeadb_100%)]">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4d6f58]">For Businesses</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#112b18]">Claim your profile and start getting local leads.</h3>
            </div>
            <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-[#123f26] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#195632]">
              Create Business Account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
