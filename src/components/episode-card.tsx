import Image from "next/image"
import Link from "next/link"

import { type PodcastEpisode } from "@/types/podcast"

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
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col transform transition-transform duration-300 hover:scale-105">
      <Link
        href={`/channel/${episode.id}`}
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
        <p className="text-muted-foreground mb-4 flex-grow line-clamp-2">
          {episode.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {episode.tags.map((tag, index) => (
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
        {episode.audioFileUrl && (
          <audio controls className="w-full h-8 mb-4">
            <source src={episode.audioFileUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        <div className="flex justify-center items-end mt-auto">
          <span className="text-sm text-muted-foreground">
            Created: {new Date(episode.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
