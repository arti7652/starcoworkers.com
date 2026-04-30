'use client'

import { useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'

interface ImageGalleryProps {
  images: string[]
  title: string
  initialShow?: number
  showMainImage?: boolean
}

export function ImageGallery({ images, title, initialShow = 6, showMainImage = true }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const displayImages = showMainImage ? images : images.slice(1)
  const allImages = images

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }, [allImages.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }, [allImages.length])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, goToPrevious, goToNext])

  if (displayImages.length === 0) return null

  return (
    <>
      <div className="rounded-2xl border border-[#d4dfd3] bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f6a3c]">Photos</h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {displayImages.slice(0, initialShow).map((image, idx) => (
            <button
              key={`${image}-${idx}`}
              onClick={() => openLightbox(showMainImage ? idx : idx + 1)}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            >
              <ContentImage 
                src={image} 
                alt={`${title} photo ${idx + (showMainImage ? 1 : 2)}`} 
                fill 
                className="object-cover" 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-white/80 text-sm font-medium">
            {currentIndex + 1} / {allImages.length}
          </div>

          {/* Navigation arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Main image */}
          <div 
            className="relative h-full w-full max-w-5xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <ContentImage
              src={allImages[currentIndex]}
              alt={`${title} photo ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
