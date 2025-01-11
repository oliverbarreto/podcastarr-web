import {
  getRecentEpisodes,
  getRecentlyModifiedEpisodes
} from "@/actions/home_page_actions"
import { EpisodeCardCompact } from "@/components/episode-card-compact"

export default async function HomePage() {
  const [recentResult, modifiedResult] = await Promise.all([
    getRecentEpisodes(),
    getRecentlyModifiedEpisodes()
  ])

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
        {recentResult.success &&
        recentResult.data &&
        recentResult.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {recentResult.data.map((episode) => (
              <EpisodeCardCompact key={episode.id} episode={episode} />
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
          <h2 className="text-2xl font-bold">Recently Modified Episodes</h2>
        </div>
        {modifiedResult.success &&
        modifiedResult.data &&
        modifiedResult.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {modifiedResult.data.map((episode) => (
              <EpisodeCardCompact key={episode.id} episode={episode} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-10">
            No recently modified episodes found.
          </p>
        )}
      </section>
    </main>
  )
}
