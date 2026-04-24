import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

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
  const body = formatRichHtml(content.body || content.description || post.summary || '', description)

  const related = (await fetchTaskPosts(task, 8, { fresh: true }))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3)

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
              <p className="text-sm leading-8 text-[#3f624a]">{description}</p>
              <div className="mt-6 rounded-[1.2rem] border border-[#d2e1d4] bg-[#f9fcf9] p-5">
                <RichContent html={body} />
              </div>

              {content.highlights?.length ? (
                <div className="mt-6 rounded-[1.2rem] border border-[#d2e1d4] bg-[#f9fcf9] p-5">
                  <h2 className="text-lg font-semibold text-[#173723]">Highlights</h2>
                  <ul className="mt-3 space-y-2 text-sm text-[#486652]">
                    {content.highlights.map((item) => (
                      <li key={item}>• {item}</li>
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
                <div className="rounded-[1.2rem] border border-[#d2e1d4] bg-[#f9fcf9] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5f7a67]">Gallery</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {images.slice(1, 7).map((image) => (
                      <div key={image} className="relative aspect-square overflow-hidden rounded-lg">
                        <ContentImage src={image} alt={`${post.title} gallery`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
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
