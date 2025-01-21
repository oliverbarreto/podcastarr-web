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

interface StatsResponse {
  total_episodes: number
  last_added_date: string | null
}

export async function getStatsTotals() {
  try {
    const response = await fetch("http://127.0.0.1:8000/stats/totals", {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    })

    if (!response.ok) {
      return { success: false, error: "Failed to fetch stats" }
    }

    const data: StatsResponse = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: `Failed to fetch stats: ${error}` }
  }
}
