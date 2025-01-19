"use server"

import { deleteEpisode } from "@/lib/api/episodes"
import { revalidatePath } from "next/cache"

export async function deleteEpisodeAction(videoId: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    await deleteEpisode(videoId)
    // Revalidate both the episode list and details pages
    revalidatePath("/channel")
    revalidatePath(`/channel/${videoId}`)
    return { success: true }
  } catch (error) {
    console.error("Failed to delete episode:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete episode"
    }
  }
}
