import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { blurDataUrl, cloudinaryUrl } from "@/lib/cloudinary";
import { cn, formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogCard({
  post,
  className,
  featured = false,
}: {
  post: BlogPost;
  className?: string;
  /** Wider layout for the lead post on the blog index. */
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "sheet sheet-fold paper-grain group relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift-lg",
        featured && "sm:grid sm:grid-cols-2 sm:items-stretch",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-paper-sunken",
          featured ? "aspect-[4/3] sm:aspect-auto sm:h-full" : "aspect-[16/10]",
        )}
      >
        <Image
          src={cloudinaryUrl(post.coverImage, { width: 900, height: 560 })}
          alt=""
          fill
          sizes={featured ? "(max-width: 640px) 90vw, 45vw" : "(max-width: 640px) 90vw, 33vw"}
          placeholder={blurDataUrl(post.coverImage) ? "blur" : "empty"}
          blurDataURL={blurDataUrl(post.coverImage)}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-brand px-3 py-1 font-display text-[0.65rem] font-semibold tracking-[0.14em] text-on-brand uppercase">
          {post.category}
        </span>
      </div>

      <div className={cn("flex flex-col p-5", featured && "sm:justify-center sm:p-8")}>
        <div className="flex items-center gap-3 text-[0.7rem] tracking-wide text-ink-faint uppercase">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock3 className="h-3 w-3" />
            {post.readingMinutes} min
          </span>
        </div>

        <h3
          className={cn(
            "mt-2 font-display leading-snug font-semibold text-ink",
            featured ? "text-2xl" : "text-lg",
          )}
        >
          <Link href={`/blogs/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-2.5 text-sm leading-relaxed text-ink-soft",
            !featured && "line-clamp-3",
          )}
        >
          {post.excerpt}
        </p>

        <p className="mt-4 flex items-center gap-1.5 font-display text-sm font-semibold text-brand transition-transform duration-200 group-hover:translate-x-1">
          Read more
          <ArrowRight className="h-4 w-4" />
        </p>
      </div>
    </article>
  );
}
