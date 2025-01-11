"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import type { PodcastEpisode } from "@/types/podcast"

export async function getEpisode(
  id: number
): Promise<{ success: boolean; data?: PodcastEpisode; error?: string }> {
  try {
    const episode = await prisma.podcastEpisode.findUnique({
      where: { id }
    })

    if (!episode) {
      return { success: false, error: "Episode not found" }
    }

    return {
      success: true,
      data: {
        ...episode,
        tags: episode.tags
          ? episode.tags.split(",").map((tag) => tag.trim())
          : []
      }
    }
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

    const episode = await prisma.podcastEpisode.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl: imageUrl || null,
        audioFileUrl: audioFileUrl || null,
        tags: tags || "",
        updatedAt: new Date()
      }
    })

    revalidatePath(`/channel/${id}`)

    return {
      success: true,
      data: {
        ...episode,
        tags: episode.tags
          ? episode.tags.split(",").map((tag) => tag.trim())
          : []
      }
    }
  } catch (error) {
    console.error("Failed to update episode:", error)
    return { success: false, error: "Failed to update episode" }
  }
}

export async function removeEpisodeById(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.podcastEpisode.delete({
      where: { id }
    })

    revalidatePath("/channel")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete episode:", error)
    return { success: false, error: "Failed to delete episode" }
  }
}
