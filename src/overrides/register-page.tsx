'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Building2, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useToast } from '@/components/ui/use-toast'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

export function RegisterPageOverride() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast({ title: 'Missing details', description: 'Please complete all required fields.' })
      return
    }

    await signup(name.trim(), email.trim(), password)
    toast({ title: 'Account created', description: 'Your profile has been saved locally and is ready to use.' })
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#f2f6f1] text-[#102214]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-[#cfe0d1] bg-white p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c5d7c8] bg-[#eff6ef] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1f6a3c]">
              <Building2 className="h-3.5 w-3.5" />
              Business Onboarding
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#163422]">Create your business listing account</h1>
            <p className="mt-5 text-sm leading-8 text-[#3f624a]">
              Publish your business profile, add service details, and start receiving local customer inquiries.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#cfe0d1] bg-white p-8 shadow-[0_24px_64px_rgba(16,34,20,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5e7a66]">Create account</p>
            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-12 rounded-xl border border-[#d2e1d4] bg-[#f8fbf8] px-4 text-sm text-[#153320]"
                placeholder="Full name"
                type="text"
              />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 rounded-xl border border-[#d2e1d4] bg-[#f8fbf8] px-4 text-sm text-[#153320]"
                placeholder="Email address"
                type="email"
              />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 rounded-xl border border-[#d2e1d4] bg-[#f8fbf8] px-4 text-sm text-[#153320]"
                placeholder="Password"
                type="password"
              />
              <button disabled={isLoading} type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#123f26] px-6 text-sm font-semibold text-white transition hover:bg-[#195632] disabled:cursor-not-allowed disabled:opacity-75">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Create account
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between text-sm text-[#4a6854]">
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#1f6a3c] hover:underline">
                Sign in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
