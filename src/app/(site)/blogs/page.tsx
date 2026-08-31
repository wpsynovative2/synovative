import { fetchPosts } from "@/lib/firebase/collections";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { Container, SectionHeading } from "@/components/paper/primitives";
import { PaperSection } from "@/components/paper/torn-edge";
import { Reveal } from "@/components/paper/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { BlogCard } from "@/components/sections/blog-card";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical notes from the Synovative studio on performance marketing, branding, content strategy, property film and web performance.",
  path: "/blogs",
  keywords: [
    "digital marketing blog",
    "performance marketing tips",
    "branding advice",
    "real estate marketing blog",
  ],
});

export default async function BlogsPage() {
  const posts = await fetchPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blogs", path: "/blogs" },
        ])}
      />

      <PageHero
        eyebrow="From the desk"
        watermark="Journal"
        title={
          <>
            Notes from the{" "}
            <span className="marker-underline text-brand">studio floor.</span>
          </>
        }
        description="What worked, what did not, and what we changed as a result. Roughly twice a month, and only when there is something worth saying."
      />

      <PaperSection tone="paper">
        <Container className="py-20 sm:py-24">
          {posts.length === 0 ? (
            <p className="py-16 text-center text-ink-soft">
              Nothing published yet — the first post is on its way.
            </p>
          ) : (
            <>
              {lead && (
                <Reveal className="mb-12">
                  <BlogCard post={lead} featured />
                </Reveal>
              )}

              {rest.length > 0 && (
                <>
                  <SectionHeading
                    eyebrow={`${rest.length} more post${rest.length === 1 ? "" : "s"}`}
                    title="Everything else"
                    className="mb-10"
                  />
                  <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post, index) => (
                      <Reveal as="li" key={post.id} delay={(index % 3) * 90}>
                        <BlogCard post={post} />
                      </Reveal>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </Container>
      </PaperSection>

      <CtaBand
        tearTop="var(--paper)"
        eyebrow="Enjoyed the reading?"
        heading="We'd rather do this for your brand than write about it."
        body="Tell us what you're working on and we'll come back with a straight answer about whether we can help."
        label="Start a project"
      />
    </>
  );
}
