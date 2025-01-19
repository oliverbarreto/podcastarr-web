"use server"

import { revalidatePath } from "next/cache"
import { episodeApi } from "@/services/api"
import type { PodcastEpisode } from "@/types/podcast"
import { fetchEpisodeById } from "@/lib/api/episodes"

export async function getEpisode(
  id: number
): Promise<{ success: boolean; data?: PodcastEpisode; error?: string }> {
  try {
    const episode = await episodeApi.getEpisode(id)
    return { success: true, data: episode }
  } catch (error) {
    console.error("Failed to get episode:", error)
    return { success: false, error: "Failed to get episode" }
  }
}

export async function updateEpisodeDetails(
  id: number,
  formData: FormData
): Promise<{ success: boolean; data?: PodcastEpisode; error?: string }> {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const imageUrl = formData.get("imageUrl") as string
    const audioFileUrl = formData.get("audioFileUrl") as string
    const tags = formData.get("tags") as string

    if (!title || !description) {
      return { success: false, error: "Title and description are required" }
    }

    const episode = await episodeApi.updateEpisode(id, {
      title,
      description,
      imageUrl: imageUrl || null,
      audioFileUrl: audioFileUrl || null,
      tags: tags || "",
      updatedAt: new Date()
    })

    revalidatePath(`/channel/${id}`)

    return { success: true, data: episode }
  } catch (error) {
    console.error("Failed to update episode:", error)
    return { success: false, error: "Failed to update episode" }
  }
}

export async function deleteEpisode(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await episodeApi.deleteEpisode(id)
    revalidatePath("/channel")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete episode:", error)
    return { success: false, error: "Failed to delete episode" }
  }
}

export async function getEpisodeById(id: string) {
  try {
    const episode = await fetchEpisodeById(id)
    return {
      success: true,
      data: episode
    }
  } catch (error) {
    console.error("Error fetching episode:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch episode"
    }
  }
}
