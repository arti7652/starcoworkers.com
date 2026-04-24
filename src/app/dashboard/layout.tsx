import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'

export default function DashboardLayout(_: { children: ReactNode }) {
  redirect('/')
}
