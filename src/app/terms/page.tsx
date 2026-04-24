import Link from 'next/link'
import { Footer } from '@/components/shared/footer'
import { NavbarShell } from '@/components/shared/navbar-shell'

const sections = [
  {
    title: 'Account Responsibilities',
    body: 'Users are responsible for keeping account credentials secure and ensuring published listing details are accurate and lawful.',
  },
  {
    title: 'Listing Content Rules',
    body: 'Do not publish misleading, fraudulent, abusive, or prohibited business content. Repeated violations may result in account suspension.',
  },
  {
    title: 'Ownership and License',
    body: 'You retain ownership of your submitted content and grant the platform a license to display, index, and format content for directory functionality.',
  },
  {
    title: 'Service Availability',
    body: 'We may update, maintain, or change platform features to improve reliability, security, and user experience.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f2f6f1] text-[#102214]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[1.8rem] border border-[#cfe0d1] bg-white p-8 shadow-[0_22px_64px_rgba(16,34,20,0.08)]">
          <p className="inline-flex items-center rounded-full border border-[#c3d5c5] bg-[#eff6ef] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1f6a3c]">
            Legal
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-[#112b18]">Terms of Service</h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#3e6149]">
            These terms define how users and businesses may use the platform, publish listings, and interact with directory services.
          </p>
          <p className="mt-4 text-xs text-[#5d7866]">Last updated: April 24, 2026</p>
        </section>

        <section className="mt-8 grid gap-4">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[1.3rem] border border-[#d2e1d4] bg-white p-6">
              <h2 className="text-xl font-semibold text-[#183623]">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#476551]">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[1.4rem] border border-[#d2e1d4] bg-white p-6">
          <p className="text-sm text-[#476551]">
            Need clarification on these terms? Reach out through our{' '}
            <Link href="/contact" className="font-semibold text-[#1f6a3c] hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
