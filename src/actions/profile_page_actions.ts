"use server"

import { channelApi } from "@/services/api"

export async function getCurrentChannel() {
  try {
    const channel = await channelApi.getChannel()
    return channel
  } catch (error) {
    throw new Error(`Failed to fetch channel with error: ${error}`)
  }
}

export async function updateChannel(formData: FormData) {
  try {
    // Validate required fields
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const authors = formData.get("authors") as string
    const authors_email = formData.get("authors_email") as string
    const owner = formData.get("owner") as string
    const owner_email = formData.get("owner_email") as string

    if (!name || !description || !authors || !authors_email) {
      return {
        success: false,
        error:
          "Channel title, description, authors name and authors email are required"
      }
    }

    const data = {
      name,
      description,
      authors,
      authors_email,
      owner: owner || "",
      owner_email: owner_email || "",
      language: (formData.get("language") as string) || "English",
      image_url: (formData.get("image_url") as string) || null,
      explicit: formData.get("explicit") === "on",
      website_url: (formData.get("website_url") as string) || "",
      category: (formData.get("category") as string) || "Technology"
    }

    console.log("Submitting channel update with data:", data)

    const channel = await channelApi.updateChannel(data)
    console.log("Channel updated successfully:", channel)

    return { success: true, data: channel }
  } catch (error) {
    console.error("Channel update error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update channel"
    }
  }
}

export const generateRssFeed = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/channel/feed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    if (!response.ok) {
      throw new Error("Failed to generate RSS feed")
    }

    return { success: true }
  } catch (error) {
    console.error("Error generating RSS feed:", error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate RSS feed"
    }
  }
}
