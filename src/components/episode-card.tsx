"use client"

import Image from "next/image"
import Link from "next/link"
import { type PodcastEpisode } from "@/types/podcast"
import { Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EpisodeCardProps {
  episode: PodcastEpisode
}

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

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const tags = episode.keywords?.split(",").map((tag) => tag.trim()) || []
  const youtubeUrl = `https://www.youtube.com/watch?v=${episode.videoId}`

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col transform transition-transform duration-300 hover:scale-105">
      <Link
        href={`/channel/${episode.videoId}`}
        className="relative aspect-video w-full bg-muted"
      >
        {episode.imageUrl ? (
          <Image
            src={episode.imageUrl}
            alt={episode.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
      </Link>
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-xl font-semibold mb-2 line-clamp-1">
          {episode.title}
        </h2>
        <div className="text-sm text-muted-foreground mb-2 flex flex-col gap-1">
          <span>By {episode.author}</span>
          <span>
            Published{" "}
            {new Date(episode.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </span>
        </div>

        <p className="text-muted-foreground mt-4 mb-4 flex-grow line-clamp-2">
          {episode.summary}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`${
                tagColors[index % tagColors.length]
              } text-white text-xs px-2 py-1 rounded-full`}
            >
              #{tag}
            </span>
          ))}
        </div>
        {episode.mediaUrl && (
          <div className="space-y-2 mb-4">
            <h2 className="text-xl font-semibold">Listen</h2>
            <audio controls className="w-full">
              <source
                src={`http://127.0.0.1:8000/audio/${episode.videoId}.m4a`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div className="mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.open(youtubeUrl, "_blank", "noopener,noreferrer")
            }}
          >
            <Youtube className="h-4 w-4 mr-2" />
            Watch on YouTube
          </Button>
        </div>
      </div>
    </div>
  )
}
