"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getCurrentChannel() {
  try {
    const channel = await prisma.podcastChannel.findFirst()
    return channel
  } catch (error) {
    throw new Error(`Failed to fetch channel with error: ${error}`)
  }
}

export async function updateChannel(formData: FormData) {
  try {
    // Extract and validate form data
    const title = formData.get("title")
    const description = formData.get("description")
    const userName = formData.get("userName")
    const userEmail = formData.get("userEmail")
    const imageUrl = formData.get("imageUrl")
    const explicitContent = formData.get("explicitContent") === "on"

    // Validate required fields
    if (!title || !description || !userName || !userEmail) {
      return { success: false, error: "Missing required fields" }
    }

    const data = {
      title: title.toString(),
      description: description.toString(),
      userName: userName.toString(),
      userEmail: userEmail.toString(),
      imageUrl: imageUrl ? imageUrl.toString() : null,
      explicitContent
    }

    // Get existing channel or create new one
    const existingChannel = await prisma.podcastChannel.findFirst()

    let channel
    if (existingChannel) {
      channel = await prisma.podcastChannel.update({
        where: { id: existingChannel.id },
        data
      })
    } else {
      channel = await prisma.podcastChannel.create({
        data
      })
    }

    revalidatePath("/profile")
    return { success: true, data: channel }
  } catch (error) {
    console.error("Update channel error:", error)
    return { success: false, error: "Failed to update channel" }
  }
}
