import Link from 'next/link'
import { ArrowRight, FileCheck2, Shield, Scale } from 'lucide-react'
import { Footer } from '@/components/shared/footer'
import { NavbarShell } from '@/components/shared/navbar-shell'

const cards = [
  {
    title: 'Privacy Policy',
    body: 'Understand what data we collect and how we protect business and user information.',
    href: '/privacy',
    icon: Shield,
  },
  {
    title: 'Terms of Service',
    body: 'Review platform usage rules for listings, accounts, and published business content.',
    href: '/terms',
    icon: Scale,
  },
  {
    title: 'Contact Legal Team',
    body: 'Need clarification? Send your legal or compliance questions directly to support.',
    href: '/contact',
    icon: FileCheck2,
  },
]

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#f2f6f1] text-[#102214]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[1.8rem] border border-[#cfe0d1] bg-white p-8 shadow-[0_22px_64px_rgba(16,34,20,0.08)]">
          <p className="inline-flex items-center rounded-full border border-[#c3d5c5] bg-[#eff6ef] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1f6a3c]">
            Legal Center
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-[#112b18]">Legal</h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#3e6149]">
            Access our legal policies, platform terms, and compliance support resources in one place.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.title} href={card.href} className="rounded-[1.4rem] border border-[#d2e1d4] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(16,34,20,0.1)]">
              <card.icon className="h-6 w-6 text-[#1f6a3c]" />
              <h2 className="mt-4 text-xl font-semibold text-[#183623]">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#476551]">{card.body}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1f6a3c]">
                Open
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
