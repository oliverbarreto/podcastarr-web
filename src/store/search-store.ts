import { create } from "zustand"
import type { PodcastEpisode } from "@/types/podcast"

interface SearchState {
  searchTerm: string
  setSearchTerm: (term: string) => void
  resetSearch: () => void
  filterEpisodes: (episodes: PodcastEpisode[]) => PodcastEpisode[]
}

export const useSearchStore = create<SearchState>((set, get) => ({
  searchTerm: "",

  setSearchTerm: (term: string) => {
    console.log("Setting search term:", term)
    set({ searchTerm: term })
  },

  resetSearch: () => set({ searchTerm: "" }),

  filterEpisodes: (episodes: PodcastEpisode[]) => {
    const { searchTerm } = get()
    console.log("Filtering episodes with term:", searchTerm)
    console.log("Total episodes:", episodes.length)

    if (!searchTerm.trim()) return episodes

    const normalizedSearch = searchTerm.toLowerCase().trim()

    const filtered = episodes.filter((episode) => {
      const searchableFields = [
        episode.title,
        episode.subtitle,
        // episode.summary,
        episode.author
      ].map((field) => (field || "").toLowerCase())

      return searchableFields.some((field) => field.includes(normalizedSearch))
    })

    console.log("Filtered episodes:", filtered.length)
    return filtered
  }
}))
