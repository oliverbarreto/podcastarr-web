"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AddEpisodeDialog } from "@/components/add-episode-dialog"
import { EpisodeCard } from "@/components/episode-card"
import { SearchInput } from "@/components/search-input"
import { useSearchStore } from "@/store/search-store"
import { getEpisodes } from "@/actions/channel_page_actions"
import type { PodcastEpisode } from "@/types/podcast"

export default function ChannelPage() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { searchTerm, filterEpisodes } = useSearchStore()

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const result = await getEpisodes()
        if (result.success && result.data) {
          console.log("Loaded episodes:", result.data.length)
          setEpisodes(result.data)
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to load episodes",
            variant: "destructive"
          })
        }
      } catch (error) {
        console.error("Failed to load episodes:", error)
        toast({
          title: "Error",
          description: "Failed to load episodes",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadEpisodes()
  }, [toast])

  const filteredEpisodes = filterEpisodes(episodes)
  console.log("Current search term:", searchTerm)
  console.log("Filtered episodes count:", filteredEpisodes.length)

  return (
    <main className="container max-w-7xl mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Your Podcast Channel</h1>
        <p className="text-xl text-muted-foreground">
          Manage and organize your podcast episodes
        </p>
      </div>

      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Podcast Episodes</h2>
          <SearchInput />
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Episode
        </Button>
      </div>

      {searchTerm && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing results for:{" "}
            <span className="font-medium">{searchTerm}</span>
          </p>
        </div>
      )}

      <section className="mb-10">
        {isLoading ? (
          <p className="text-muted-foreground col-span-full text-center py-10">
            Loading episodes...
          </p>
        ) : episodes.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center py-10">
            No episodes yet. Click the Add Episode button to create your first
            episode.
          </p>
        ) : filteredEpisodes.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center py-10">
            No episodes found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        )}
      </section>

      <AddEpisodeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={(episode) => {
          setEpisodes((prev) => [episode, ...prev])
          toast({
            title: "Success",
            description: "Episode created successfully"
          })
        }}
      />
    </main>
  )
}
