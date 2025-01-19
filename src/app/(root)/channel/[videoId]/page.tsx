import Image from "next/image"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getEpisodeById } from "@/actions/episode_details_actions"

interface PageProps {
  params: Promise<{ videoId: string }> | { videoId: string }
}

export default async function EpisodeDetailsPage({ params }: PageProps) {
  // Wait for params to be resolved
  const resolvedParams = await params

  // Validate params before using
  if (!resolvedParams?.videoId) {
    notFound()
  }

  try {
    const result = await getEpisodeById(resolvedParams.videoId)

    if (!result.success || !result.data) {
      notFound()
    }

    const episode = result.data
    const tags =
      episode.keywords?.split(",").map((tag: string) => tag.trim()) || []

    return (
      <main className="container max-w-4xl mx-auto py-10">
        <div className="mb-6">
          <Link href="/channel">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Channel
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            {episode.imageUrl ? (
              <Image
                src={episode.imageUrl}
                alt={episode.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">
                  No image available
                </span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{episode.title}</h1>
            {episode.subtitle && (
              <p className="text-xl text-muted-foreground">
                {episode.subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By {episode.author}</span>
              <span>•</span>
              <span>
                Published{" "}
                {format(new Date(episode.publishedAt), "MMMM d, yyyy")}
              </span>
              {episode.mediaDuration && (
                <>
                  <span>•</span>
                  <span>{Math.round(episode.mediaDuration / 60)} minutes</span>
                </>
              )}
            </div>

            {episode.summary && (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="whitespace-pre-wrap">{episode.summary}</p>
              </div>
            )}

            {episode.mediaUrl && (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Listen</h2>
                <audio controls className="w-full">
                  <source src={episode.mediaUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              <p>Last updated: {format(new Date(episode.updatedAt), "PPpp")}</p>
              <p>Status: {episode.status}</p>
            </div>
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error loading episode:", error)
    notFound()
  }
}
