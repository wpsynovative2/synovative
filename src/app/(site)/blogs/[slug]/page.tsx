import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { posts as seedPosts } from "@/content/blogs";
import { fetchPost, fetchRelatedPosts } from "@/lib/firebase/collections";
import { blurDataUrl, cloudinaryUrl } from "@/lib/cloudinary";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { Container, SectionHeading, Sheet, Tape } from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { Reveal } from "@/components/paper/reveal";
import { PostBody } from "@/components/blog/post-body";
import { BlogCard } from "@/components/sections/blog-card";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";

/**
 * Seeded posts are prerendered at build time. Posts added later through the
 * admin panel are not in this list, so `dynamicParams` stays on and they render
 * on first request and are then cached.
 */
export function generateStaticParams() {
  return seedPosts
    .filter((post) => post.status === "published")
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    path: `/blogs/${post.slug}`,
    keywords: post.tags,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    authors: [post.author.name],
    image: cloudinaryUrl(post.coverImage, { width: 1200, height: 630 }),
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();

  const related = await fetchRelatedPosts(slug, 3);

  return (
    <>
      <JsonLd
        schema={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blogs" },
            { name: post.title, path: `/blogs/${post.slug}` },
          ]),
        ]}
      />

      {/* Header */}
      <article>
        <PaperSection tone="tint">
          <Container size="narrow" className="pt-16 pb-16 sm:pt-20">
            <Link
              href="/blogs"
              className="mb-8 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand transition-transform duration-200 hover:-translate-x-1"
            >
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>

            <p className="eyebrow mb-4">{post.category}</p>

            <h1 className="text-3xl leading-[1.12] font-bold text-ink sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display font-bold text-on-brand">
                  {post.author.name.charAt(0)}
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-ink-faint">{post.author.role}</p>
                </div>
              </div>

              <span className="flex items-center gap-1.5 text-sm text-ink-soft">
                <CalendarDays className="h-4 w-4 text-brand" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>

              <span className="flex items-center gap-1.5 text-sm text-ink-soft">
                <Clock3 className="h-4 w-4 text-brand" />
                {post.readingMinutes} min read
              </span>
            </div>
          </Container>
        </PaperSection>

        {/* Cover */}
        <PaperSection tone="paper" tearTop="var(--paper-tint)">
          <Container size="narrow" className="pt-16 pb-4">
            <figure className="relative">
              <Tape className="-top-3 left-10 z-20 h-6 w-24" rotate={-5} />
              <Sheet tiltSeed={post.slug} maxTilt={0.8} className="p-3">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-paper-sunken">
                  <Image
                    src={cloudinaryUrl(post.coverImage, { width: 1400, height: 788 })}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 92vw, 720px"
                    placeholder={blurDataUrl(post.coverImage) ? "blur" : "empty"}
                    blurDataURL={blurDataUrl(post.coverImage)}
                    priority
                    className="object-cover"
                  />
                </div>
              </Sheet>
            </figure>
          </Container>

          {/* Body */}
          <Container size="narrow" className="py-14">
            <PostBody body={post.body} />

            {post.tags.length > 0 && (
              <ul className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-brand-wash px-3.5 py-1.5 text-xs font-medium text-brand"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </PaperSection>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <PaperSection tone="sunken" tearTop="var(--paper)">
          <Container className="py-20 sm:py-24">
            <SectionHeading
              eyebrow="Keep reading"
              watermark="More"
              title="Related posts"
              className="mb-12"
            />
            <ul className="grid gap-7 md:grid-cols-3">
              {related.map((item, index) => (
                <Reveal as="li" key={item.id} delay={index * 90}>
                  <BlogCard post={item} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </PaperSection>
      )}

      <CtaBand
        tearTop="var(--paper-sunken)"
        eyebrow="Put this into practice"
        heading="Rather have us do it than do it yourself?"
        body="Send us the brief. We'll tell you honestly whether it's worth hiring an agency for."
        label="Talk to the studio"
      />
    </>
  );
}
