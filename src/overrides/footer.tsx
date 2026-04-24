import Link from 'next/link'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  return (
    <footer className="border-t border-[#ccddce] bg-[linear-gradient(180deg,#eaf3eb_0%,#dceade_100%)] text-[#153320]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:px-8">
        <div>
          <p className="text-xl font-semibold">Star Coworkers</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[#3f5f49]">
            Business listing directory for trusted local services, verified providers, and location-based business discovery.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a7864]">Explore</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/listings" className="hover:underline">Business Listings</Link></li>
            <li><Link href="/search" className="hover:underline">Search</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a7864]">Legal</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/legal" className="hover:underline">Legal Center</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#ccddce] px-4 py-4 text-center text-sm text-[#4a6a54]">
        &copy; {new Date().getFullYear()} Star Coworkers. All rights reserved.
      </div>
    </footer>
  )
}
