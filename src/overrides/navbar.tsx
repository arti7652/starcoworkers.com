'use client'

import Link from 'next/link'
import { LogOut, Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export const NAVBAR_OVERRIDE_ENABLED = true

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Search', href: '/search' },
  { label: 'Legal', href: '/legal' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-[#cddccc] bg-[rgba(239,247,239,0.92)] text-[#153320] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#bdd1bf] bg-white p-1.5">
            <img src="/favicon.png?v=20260401" alt="Site logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-lg font-semibold leading-tight">Star Coworkers</p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#54725d]">Business Listings</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition ${pathname === item.href ? 'text-[#0f2a18]' : 'text-[#40624b] hover:text-[#0f2a18]'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" size="sm" asChild className="rounded-full border-[#c8d9cb] bg-white text-[#214a31] hover:bg-[#f1f8f2]">
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Link>
          </Button>

          {isAuthenticated ? (
            <Button size="sm" onClick={logout} className="rounded-full bg-[#123f26] text-white hover:bg-[#195632]">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-[#214a31] hover:bg-[#e8f2e9]">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="rounded-full bg-[#123f26] text-white hover:bg-[#195632]">
                <Link href="/register">List Business</Link>
              </Button>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setOpen((prev) => !prev)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {open ? (
        <div className="border-t border-[#cedccd] bg-[#eef6ee] px-4 py-4 lg:hidden">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold ${pathname === item.href ? 'bg-[#123f26] text-white' : 'bg-white text-[#1c452b]'}`}
              >
                {item.label}
              </Link>
            ))}
            {!isAuthenticated ? (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="block rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#1c452b]">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="block rounded-xl bg-[#123f26] px-4 py-3 text-sm font-semibold text-white">
                  List Business
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
                className="block w-full rounded-xl bg-[#123f26] px-4 py-3 text-left text-sm font-semibold text-white"
                type="button"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
