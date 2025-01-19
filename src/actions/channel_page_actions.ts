"use server"

import { revalidatePath } from "next/cache"
import { fetchEpisodes, createEpisode } from "@/lib/api/episodes"

export async function getEpisodes() {
  try {
    const episodes = await fetchEpisodes()
    return {
      success: true,
      data: episodes
    }
  } catch (error) {
    console.error("Error fetching episodes:", error)
    return {
      success: false,
      error: "Failed to fetch episodes"
    }
  }
}

export async function addEpisode(youtubeUrl: string) {
  try {
    const episode = await createEpisode(youtubeUrl)
    revalidatePath("/channel")
    return {
      success: true,
      data: episode
    }
  } catch (error) {
    console.error("Error creating episode:", error)
    return {
      success: false,
      error: "Failed to create episode"
    }
  }
}
