"use server"

import { fetchRecentEpisodes } from "@/lib/api/episodes"
import type { PodcastEpisode } from "@/types/podcast"

export async function getRecentEpisodes(): Promise<{
  success: boolean
  data?: {
    lastAdded: PodcastEpisode[]
    lastUpdated: PodcastEpisode[]
    lastAccessed: PodcastEpisode[]
  }
  error?: string
}> {
  try {
    const data = await fetchRecentEpisodes()
    return {
      success: true,
      data: {
        lastAdded: data.last_added,
        lastUpdated: data.last_updated,
        lastAccessed: data.last_accessed
      }
    }
  } catch (error) {
    console.error("Failed to fetch recent episodes:", error)
    return { success: false, error: "Failed to fetch recent episodes" }
  }
}

export async function getRecentlyModifiedEpisodes(): Promise<{
  success: boolean
  data?: PodcastEpisode[]
  error?: string
}> {
  try {
    const episodes = await prisma.podcastEpisode.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" }
    })

    return {
      success: true,
      data: episodes.map((episode) => ({
        ...episode,
        tags: episode.tags
          ? episode.tags.split(",").map((tag) => tag.trim())
          : []
      }))
    }
  } catch (error) {
    console.error("Failed to fetch recently modified episodes:", error)
    return {
      success: false,
      error: "Failed to fetch recently modified episodes"
    }
  }
}
