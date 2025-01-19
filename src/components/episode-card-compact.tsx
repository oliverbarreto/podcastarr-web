import Link from "next/link"
import Image from "next/image"
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
}

export function EpisodeCardCompact({ episode }: EpisodeCardCompactProps) {
  const tags = episode.tags || []

  return (
    <Link href={`/channel/${episode.videoId}`} className="group block w-full">
      <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col transform transition-transform duration-300 hover:scale-105 bg-card">
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
            {episode.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-auto">
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
          {episode.mediaUrl && (
            <audio controls className="w-full h-8 mb-4">
              <source src={episode.mediaUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>
    </Link>
  )
}
