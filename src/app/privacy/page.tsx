import Link from 'next/link'
import { Footer } from '@/components/shared/footer'
import { NavbarShell } from '@/components/shared/navbar-shell'

const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect account details, listing content, contact preferences, and usage activity needed to provide business discovery and support features.',
  },
  {
    title: 'How Data Is Used',
    body: 'Your data is used to operate search, improve listing quality, verify profiles, prevent abuse, and deliver essential account communications.',
  },
  {
    title: 'Data Sharing',
    body: 'We do not sell personal information. Data may be shared with trusted service providers only for hosting, analytics, security, and support operations.',
  },
  {
    title: 'Your Controls',
    body: 'You can request updates or deletion of your account details and listing data. You may also manage communication preferences at any time.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f2f6f1] text-[#102214]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[1.8rem] border border-[#cfe0d1] bg-white p-8 shadow-[0_22px_64px_rgba(16,34,20,0.08)]">
          <p className="inline-flex items-center rounded-full border border-[#c3d5c5] bg-[#eff6ef] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1f6a3c]">
            Legal
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-[#112b18]">Privacy Policy</h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#3e6149]">
            This policy explains how we collect, use, and protect your information while you browse listings, create accounts, and manage business profiles.
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
            Questions about this policy? Visit our{' '}
            <Link href="/contact" className="font-semibold text-[#1f6a3c] hover:underline">
              contact page
            </Link>{' '}
            for support.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
