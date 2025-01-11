"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import type { PodcastEpisode } from "@/types/podcast"

export async function getEpisodes(): Promise<{
  success: boolean
  data?: PodcastEpisode[]
  error?: string
}> {
  try {
    const episodes = await prisma.podcastEpisode.findMany({
      orderBy: { createdAt: "desc" }
    })

    const formattedEpisodes = episodes.map((episode) => ({
      ...episode,
      tags: episode.tags ? episode.tags.split(",").map((tag) => tag.trim()) : []
    }))

    return { success: true, data: formattedEpisodes }
  } catch (error) {
    console.error("Error fetching episodes:", error)
    return { success: false, error: "Failed to fetch episodes" }
  }
}

export async function createEpisode(
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

    const episode = await prisma.podcastEpisode.create({
      data: {
        title,
        description,
        imageUrl: imageUrl || null,
        audioFileUrl: audioFileUrl || null,
        tags: tags || "",
        publishedAt: new Date()
      }
    })

    revalidatePath("/channel")

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
    console.error("Failed to create episode:", error)
    return { success: false, error: "Failed to create episode" }
  }
}
