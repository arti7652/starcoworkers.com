import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { ListingActionBar } from '@/components/tasks/listing-action-bar'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { ImageGallery } from '@/components/shared/image-gallery'

type PostContent = {
  category?: string
  location?: string
  address?: string
  website?: string
  phone?: string
  email?: string
  description?: string
  body?: string
  excerpt?: string
  highlights?: string[]
  images?: string[]
  latitude?: number | string
  longitude?: number | string
}

const isValidImageUrl = (value?: string | null) =>
  typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))

const getContent = (post: SitePost): PostContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as PostContent
}

const getImageUrls = (post: SitePost, content: PostContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media
    .map((item) => item?.url)
    .filter((url): url is string => isValidImageUrl(url))
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => isValidImageUrl(url))
    : []
  const merged = [...mediaImages, ...contentImages]
  return merged.length ? merged : ['/placeholder.svg?height=1000&width=1600']
}

const htmlToPlainText = (value: string) =>
  value
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()

const toNumber = (value?: number | string) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

const buildMapEmbedUrl = (
  latitude?: number | string,
  longitude?: number | string,
  address?: string
) => {
  const lat = toNumber(latitude)
  const lon = toNumber(longitude)
  const normalizedAddress = typeof address === 'string' ? address.trim() : ''

  if (lat !== null && lon !== null) {
    const delta = 0.01
    const left = lon - delta
    const right = lon + delta
    const bottom = lat - delta
    const top = lat + delta
    const bbox = `${left},${bottom},${right},${top}`
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
      bbox
    )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`
  }

  if (normalizedAddress) {
    return `https://www.google.com/maps?q=${encodeURIComponent(normalizedAddress)}&output=embed`
  }

  return null
}

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()

  const taskConfig = getTaskConfig(task)
  const content = getContent(post)
  const images = getImageUrls(post, content)
  const category = content.category || post.tags?.[0] || taskConfig?.label || 'Listing'
  const location = content.address || content.location || ''
  const description =
    content.description ||
    content.excerpt ||
    post.summary ||
    'Business profile details and service overview are available below.'
  const readableDescription = htmlToPlainText(description)
  const descriptionHtml = formatRichHtml(description, 'Business profile details and service overview are available below.')
  const bodyHtml = formatRichHtml(content.body || '', '')
  const mapEmbedUrl = buildMapEmbedUrl(content.latitude, content.longitude, location)
  const detailUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${taskConfig?.route || '/listings'}/${post.slug}`

  const related = (await fetchTaskPosts(task, 8, { fresh: true }))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3)

  const isListingStyle = task === 'listing' || task === 'classified' || task === 'profile'

  if (isListingStyle) {
    return (
      <div className="min-h-screen bg-[#edf2eb] text-[#122114]">
        <NavbarShell />
        <main className="mx-auto w-full max-w-[1700px] px-0 pb-10 lg:px-4 lg:pt-6">
          <div className="grid min-h-[72vh] overflow-hidden border-y border-[#cdd8cc] bg-white lg:rounded-[1.6rem] lg:border lg:shadow-[0_24px_64px_rgba(17,33,20,0.10)] lg:grid-cols-[560px_1fr]">
            <section className="flex flex-col border-r border-[#dbe4da] bg-[#f5f8f4]">
              <div className="relative h-[250px] sm:h-[280px]">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/65" />
                <div className="absolute left-5 top-5">
                  <Link
                    href={taskConfig?.route || '/listings'}
                    className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/45"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                  </Link>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                    <Tag className="h-3.5 w-3.5" />
                    {category}
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{post.title}</h1>
                  {location ? (
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-emerald-50">
                      <MapPin className="h-4 w-4" />
                      {location}
                    </p>
                  ) : null}
                </div>
              </div>

              <ListingActionBar title={post.title} url={detailUrl} website={content.website} location={location} />

              <div className="space-y-5 overflow-y-auto p-5 sm:p-6">
                <RichContent html={descriptionHtml} className="text-sm leading-7 text-[#3f624a]" />

                <div className="rounded-2xl border border-[#d4dfd3] bg-white p-4">
                  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1f6a3c]">
                    <ShieldCheck className="h-3.5 w-3.5" /> Contact Details
                  </p>
                  <div className="mt-3 space-y-2.5 text-sm text-[#496553]">
                    {content.website ? (
                      <a href={content.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                        <Globe className="h-4 w-4" />
                        {content.website.replace(/^https?:\/\//, '')}
                      </a>
                    ) : null}
                    {content.phone ? (
                      <a href={`tel:${content.phone}`} className="flex items-center gap-2 hover:underline">
                        <Phone className="h-4 w-4" />
                        {content.phone}
                      </a>
                    ) : null}
                    {content.email ? (
                      <a href={`mailto:${content.email}`} className="flex items-center gap-2 hover:underline">
                        <Mail className="h-4 w-4" />
                        {content.email}
                      </a>
                    ) : null}
                  </div>
                </div>

                {images.length > 1 ? (
                  <ImageGallery images={images} title={post.title} showMainImage={false} />
                ) : null}

                {content.highlights?.length ? (
                  <div className="rounded-2xl border border-[#d4dfd3] bg-white p-4">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f6a3c]">Highlights</h2>
                    <ul className="mt-3 space-y-2 text-sm text-[#486652]">
                      {content.highlights.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>

            <section className="relative min-h-[520px] bg-[#dde6dd]">
              {mapEmbedUrl ? (
                <iframe title="Business location map" src={mapEmbedUrl} className="h-full min-h-[520px] w-full" loading="lazy" />
              ) : (
                <div className="flex h-full min-h-[520px] items-center justify-center p-6 text-sm text-[#496553]">
                  Map location is not available for this listing.
                </div>
              )}
            </section>
          </div>

          {related.length ? (
            <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-2">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#112b18]">Related Posts</h2>
                {taskConfig?.route ? (
                  <Link href={taskConfig.route} className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f6a3c] hover:underline">
                    View all
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <TaskPostCard key={item.id} post={item} href={buildPostUrl(task, item.slug)} taskKey={task} />
                ))}
              </div>
            </section>
          ) : null}
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f2f6f1] text-[#102214]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={taskConfig?.route || '/listings'}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2a5e3c] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {taskConfig?.label || 'Listings'}
        </Link>

        <section className="overflow-hidden rounded-[2rem] border border-[#cfe0d1] bg-white shadow-[0_24px_64px_rgba(16,34,20,0.08)]">
          <div className="relative h-[280px] sm:h-[360px]">
            <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/75" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
              <p className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                <Tag className="h-3.5 w-3.5" />
                {category}
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">{post.title}</h1>
              {location ? (
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-50">
                  <MapPin className="h-4 w-4" />
                  {location}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-8 p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
            <article>
              <RichContent html={descriptionHtml} className="text-sm leading-8 text-[#3f624a]" />
              {bodyHtml ? (
              <div className="mt-6 rounded-[1.2rem] border border-[#d2e1d4] bg-[#f9fcf9] p-5">
                <RichContent html={bodyHtml} />
              </div>
              ) : null}

              {content.highlights?.length ? (
                <div className="mt-6 rounded-[1.2rem] border border-[#d2e1d4] bg-[#f9fcf9] p-5">
                  <h2 className="text-lg font-semibold text-[#173723]">Highlights</h2>
                  <ul className="mt-3 space-y-2 text-sm text-[#486652]">
                    {content.highlights.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>

            <aside className="space-y-4">
              <div className="rounded-[1.2rem] border border-[#d2e1d4] bg-[#f9fcf9] p-5">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1f6a3c]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Contact Details
                </p>
                <div className="mt-4 space-y-3 text-sm text-[#476551]">
                  {content.website ? (
                    <a href={content.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                      <Globe className="h-4 w-4" />
                      Visit website
                    </a>
                  ) : null}
                  {content.phone ? (
                    <a href={`tel:${content.phone}`} className="flex items-center gap-2 hover:underline">
                      <Phone className="h-4 w-4" />
                      {content.phone}
                    </a>
                  ) : null}
                  {content.email ? (
                    <a href={`mailto:${content.email}`} className="flex items-center gap-2 hover:underline">
                      <Mail className="h-4 w-4" />
                      {content.email}
                    </a>
                  ) : null}
                  {location ? (
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  ) : null}
                </div>
                <div className="mt-5 space-y-2">
                  <Link
                    href={`/search?q=${encodeURIComponent(post.title)}`}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#123f26] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#195632]"
                  >
                    Search Similar
                  </Link>
                  <Link
                    href={taskConfig?.route || '/listings'}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-[#c9dacb] bg-white px-4 py-2.5 text-sm font-semibold text-[#1f6a3c] transition hover:bg-[#eef6ef]"
                  >
                    Browse More
                  </Link>
                </div>
              </div>

              {images.length > 1 ? (
                <ImageGallery images={images} title={post.title} showMainImage={false} />
              ) : null}
            </aside>
          </div>
        </section>

        {related.length ? (
          <section className="mt-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#112b18]">Related Posts</h2>
              {taskConfig?.route ? (
                <Link href={taskConfig.route} className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f6a3c] hover:underline">
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={buildPostUrl(task, item.slug)} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
