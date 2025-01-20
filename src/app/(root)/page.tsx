import { getRecentEpisodes } from "@/actions/home_page_actions"
import { EpisodeCardCompact } from "@/components/episode-card-compact"
import Link from "next/link"

export default async function HomePage() {
  const result = await getRecentEpisodes()

  return (
    <main className="container max-w-7xl mx-auto py-10 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Your Podcast Manager
        </h1>
        <p className="text-xl text-muted-foreground">
          Manage and organize your podcast episodes with ease
        </p>
      </div>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recently Added Episodes</h2>
        </div>
        {result.success && result.data?.lastAdded.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {result.data.lastAdded.map((episode) => (
              <Link
                key={episode.id}
                href={`/channel/${episode.videoId}`}
                className="block group"
              >
                <EpisodeCardCompact episode={episode} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-10">
            No episodes found. Start by adding your first episode!
          </p>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recently Updated Episodes</h2>
        </div>
        {result.success && result.data?.lastUpdated.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {result.data.lastUpdated.map((episode) => (
              <Link
                key={episode.id}
                href={`/channel/${episode.videoId}`}
                className="block group"
              >
                <EpisodeCardCompact episode={episode} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-10">
            No recently updated episodes found.
          </p>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recently Accessed Episodes</h2>
        </div>
        {result.success && result.data?.lastAccessed.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {result.data.lastAccessed.map((episode) => (
              <Link
                key={episode.id}
                href={`/channel/${episode.videoId}`}
                className="block group"
              >
                <EpisodeCardCompact episode={episode} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-10">
            No recently accessed episodes found.
          </p>
        )}
      </section>
    </main>
  )
}
