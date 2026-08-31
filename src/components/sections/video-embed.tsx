"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { youtubeEmbedUrl, youtubeThumbnail } from "@/lib/cloudinary";

/**
 * Click-to-load YouTube embed.
 *
 * Showing a thumbnail until the visitor asks to play keeps YouTube's ~1MB
 * player and its cookies off the page entirely for the majority who never
 * press play — which matters on a page that carries several videos.
 */
export function VideoEmbed({
  videoId,
  title,
  poster,
}: {
  videoId: string;
  title: string;
  /** Optional Cloudinary poster; falls back to YouTube's own thumbnail. */
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="sheet paper-grain relative aspect-video overflow-hidden bg-paper-sunken">
      {playing ? (
        <iframe
          src={`${youtubeEmbedUrl(videoId)}&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={poster ?? youtubeThumbnail(videoId)}
            alt=""
            fill
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#2a2135]/70 via-transparent to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-brand shadow-lift-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4 text-left font-display text-sm font-semibold text-white">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
