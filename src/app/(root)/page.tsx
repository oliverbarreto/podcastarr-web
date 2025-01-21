import { getRecentEpisodes, getStatsTotals } from "@/actions/home_page_actions"
import { EpisodeCardCompact } from "@/components/episode-card-compact"
import { StatsTotals } from "@/components/stats-totals"
import Link from "next/link"

export default async function HomePage() {
  const result = await getRecentEpisodes()
  const stats = await getStatsTotals()

  return (
    <main className="container max-w-7xl mx-auto py-10">
      <div className="mb-12">
        {stats.success && stats.data ? (
          <StatsTotals
            totalEpisodes={stats.data.total_episodes}
            lastAddedDate={stats.data.last_added_date}
          />
        ) : (
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-muted-foreground">
              Unable to load channel stats
            </p>
          </div>
        )}
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recently Added Episodes</h2>
            <Link
              href="/channel"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              show more
            </Link>
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
            <Link
              href="/channel"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              show more
            </Link>
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
            <Link
              href="/channel"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              show more
            </Link>
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
      </div>
    </main>
  )
}
