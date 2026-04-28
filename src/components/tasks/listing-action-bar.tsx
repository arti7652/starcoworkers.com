'use client'

import { useEffect, useMemo, useState } from 'react'
import { Heart, MoreHorizontal, Share2 } from 'lucide-react'

type ListingActionBarProps = {
  title: string
  url: string
  website?: string
  location?: string
}

const storageKey = 'saved-listing-urls'

export function ListingActionBar({ title, url, website, location }: ListingActionBarProps) {
  const [saved, setSaved] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      const items = raw ? (JSON.parse(raw) as string[]) : []
      setSaved(items.includes(url))
    } catch {
      setSaved(false)
    }
  }, [url])

  const shareText = useMemo(() => `Check this out: ${title}`, [title])

  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: shareText, url })
        return
      }
      await navigator.clipboard.writeText(url)
      window.alert('Link copied to clipboard.')
    } catch {
      window.alert('Could not share right now.')
    }
  }

  const onSave = () => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      const items = raw ? (JSON.parse(raw) as string[]) : []
      const next = saved ? items.filter((item) => item !== url) : [...items, url]
      window.localStorage.setItem(storageKey, JSON.stringify(next))
      setSaved(!saved)
      window.alert(saved ? 'Removed from saved.' : 'Saved successfully.')
    } catch {
      window.alert('Could not update saved items.')
    }
  }

  const onCopyAddress = async () => {
    if (!location) return
    try {
      await navigator.clipboard.writeText(location)
      window.alert('Address copied.')
    } catch {
      window.alert('Could not copy address.')
    }
  }

  return (
    <div className="relative grid grid-cols-3 border-y border-[#dbe4da] bg-white text-center text-[#1d6b3d]">
      <button type="button" onClick={onShare} className="flex flex-col items-center gap-1 py-3 text-xs font-semibold hover:bg-[#f5faf6]">
        <Share2 className="h-4 w-4" /> Share
      </button>
      <button type="button" onClick={onSave} className="flex flex-col items-center gap-1 py-3 text-xs font-semibold hover:bg-[#f5faf6]">
        <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} /> Save
      </button>
      <button type="button" onClick={() => setMenuOpen((open) => !open)} className="flex flex-col items-center gap-1 py-3 text-xs font-semibold hover:bg-[#f5faf6]">
        <MoreHorizontal className="h-4 w-4" /> More
      </button>

      {menuOpen ? (
        <div className="absolute right-3 top-[calc(100%+0.45rem)] z-20 w-48 rounded-xl border border-[#cfe0d1] bg-white p-2 text-left shadow-lg">
          <button
            type="button"
            onClick={onShare}
            className="block w-full rounded-lg px-3 py-2 text-sm text-[#1d6b3d] hover:bg-[#f5faf6]"
          >
            Share link
          </button>
          <button
            type="button"
            onClick={onCopyAddress}
            disabled={!location}
            className="block w-full rounded-lg px-3 py-2 text-sm text-[#1d6b3d] hover:bg-[#f5faf6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Copy address
          </button>
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg px-3 py-2 text-sm text-[#1d6b3d] hover:bg-[#f5faf6]"
            >
              Open website
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
