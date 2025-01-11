"use server"

import { prisma } from "@/lib/prisma"

export async function getCurrentChannel() {
  try {
    const channel = await prisma.podcastChannel.findFirst()
    return channel
  } catch (error) {
    throw new Error(`Failed to fetch channel with error: ${error}`)
  }
}

export async function getChannel() {
  try {
    const channel = await prisma.podcastChannel.findFirst({
      where: {
        id: 1
      }
      // Add cacheStrategy: 'no-store' if using Next.js fetch
    })
    return { success: true, data: channel }
  } catch (error) {
    console.error("Get channel error:", error)
    return { success: false, error: "Failed to get channel" }
  }
}

export async function updateChannel(formData: FormData) {
  try {
    // Log the incoming form data
    console.log("Language from form:", formData.get("language"))

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      userName: formData.get("userName") as string,
      userEmail: formData.get("userEmail") as string,
      ownerName: (formData.get("ownerName") as string) || "",
      ownerEmail: (formData.get("ownerEmail") as string) || "",
      language: (formData.get("language") as string) || "English",
      imageUrl: formData.get("imageUrl") as string,
      explicitContent: formData.get("explicitContent") === "on"
    }

    // Log the data being sent to Prisma
    console.log("Data being sent to Prisma:", data)

    const channel = await prisma.podcastChannel.upsert({
      where: { id: 1 },
      update: data,
      create: { ...data, id: 1 }
    })
    // Log the response from Prisma
    console.log("Updated channel:", channel)

    return { success: true, data: channel }
  } catch (error) {
    console.error("Update error:", error)
    return { success: false, error: "Failed to update channel" }
  }
}
