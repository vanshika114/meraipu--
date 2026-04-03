"use client";

import { Play, PlayCircle } from "lucide-react";
import { motion } from "motion/react";
import type { VideoLink } from "@/lib/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function getYoutubeVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "www.youtube.com" || u.hostname === "youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return v;
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/").filter(Boolean)[1] ?? null;
    }
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("/")[0] || null;
  } catch { return null; }
  return null;
}

function getEmbedUrl(url: string): string {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
}

interface YoutubeCardProps {
  video: VideoLink;
}

export function YoutubeCard({ video }: YoutubeCardProps) {
  const videoId = getYoutubeVideoId(video.url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  const embedUrl = getEmbedUrl(video.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-shadow hover:border-primary/30 hover:shadow-lg"
    >
      {/* Thumbnail with dialog trigger */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="aspect-video relative bg-muted cursor-pointer">
            {thumbnailUrl ? (
              <>
                <img
                  src={thumbnailUrl}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
                  <PlayCircle className="h-14 w-14 text-white/80 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                </div>
                {/* Gradient bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <Play className="h-12 w-12" />
              </div>
            )}
          </div>
        </DialogTrigger>

        {/* Video modal */}
        <DialogContent className="max-w-3xl p-0 border-0">
          <div className="aspect-video">
            <iframe
              src={embedUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Title */}
      <div className="p-4">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <Play className="h-3 w-3 fill-current" />
          Click thumbnail to watch
        </p>
      </div>
    </motion.div>
  );
}