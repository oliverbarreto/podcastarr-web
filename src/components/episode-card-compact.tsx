"use client"

import Image from "next/image"
import { Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PodcastEpisode } from "@/types/podcast"

const tagColors = [
  "bg-pink-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-orange-500"
]

interface EpisodeCardCompactProps {
  episode: PodcastEpisode
  onClickYoutube?: (e: React.MouseEvent) => void
}

export function EpisodeCardCompact({ episode }: EpisodeCardCompactProps) {
  const tags = episode.tags || []
  const youtubeUrl = `https://www.youtube.com/watch?v=${episode.videoId}`

  const handleYoutubeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(youtubeUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col transform transition-transform duration-300 hover:scale-105 bg-card h-full">
      <div className="relative aspect-video w-full bg-muted">
        {episode.imageUrl ? (
          <Image
            src={episode.imageUrl}
            alt={episode.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}
      </div>
      <div className="p-3 flex-grow flex flex-col">
        <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
          {episode.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-2">
          {episode.subtitle}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={tag}
              className={`${
                tagColors[index % tagColors.length]
              } text-white text-xs px-1.5 py-0.5 rounded-full`}
            >
              #{tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{tags.length - 3} more
            </span>
          )}
        </div>
        <div className="mt-auto pt-3 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={handleYoutubeClick}
          >
            <Youtube className="h-4 w-4 mr-2" />
            Watch on YouTube
          </Button>
        </div>
      </div>
    </div>
  )
}
