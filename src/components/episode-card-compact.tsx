"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import type { VideoStats } from "@/lib/api-client"
import type { PodcastEpisode } from "@/types/podcast"

interface EpisodeCardCompactProps {
  episode: VideoStats | PodcastEpisode
  href?: string // Optional custom href
  className?: string // Optional additional classes
}

export function EpisodeCardCompact({
  episode,
  href,
  className = ""
}: EpisodeCardCompactProps) {
  // Handle both VideoStats and PodcastEpisode types
  const isVideoStats = (ep: VideoStats | PodcastEpisode): ep is VideoStats =>
    "video_id" in ep && "keywords" in ep

  const videoId = isVideoStats(episode) ? episode.video_id : episode.videoId
  const title = isVideoStats(episode) ? episode.filename : episode.title
  const keywords = isVideoStats(episode) ? episode.keywords || [] : []

  // Handle duration with proper type checking
  let duration = 0
  if (isVideoStats(episode)) {
    duration = episode.duration
  }

  // Handle dates with proper type checking
  let lastAccessed: string | undefined
  if (isVideoStats(episode)) {
    lastAccessed = episode.last_accessed
  } else {
    lastAccessed = episode.updatedAt?.toString()
  }

  const CardContent = () => (
    <div className="p-4">
      <h3 className="font-semibold line-clamp-2 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {keywords.slice(0, 3).map((keyword, index) => (
          <Badge
            key={`${keyword}-${index}`}
            variant="outline"
            className="text-xs bg-primary/10 hover:bg-primary/20"
          >
            {keyword.trim()}
          </Badge>
        ))}
      </div>
      {lastAccessed && (
        <p className="text-sm text-muted-foreground mt-2">
          {formatDistanceToNow(new Date(lastAccessed), {
            addSuffix: true
          })}
        </p>
      )}
    </div>
  )

  const cardClasses = `overflow-hidden transition-transform duration-200 group-hover:scale-105 ${className}`

  const card = (
    <Card className={cardClasses}>
      <div className="aspect-video relative">
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, "0")}
        </div>
      </div>
      <CardContent />
    </Card>
  )

  if (href) {
    return (
      <div className="group cursor-pointer">
        <Link href={href} className="block">
          {card}
        </Link>
      </div>
    )
  }

  return card
}
