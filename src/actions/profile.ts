"use server"

import { prisma } from "@/lib/prisma"

export async function getProfileImage() {
  try {
    const profile = await prisma.podcastChannel.findFirst({
      select: {
        imageUrl: true
      }
    })
    return profile?.imageUrl || null
  } catch (error) {
    console.error("Error fetching profile:", error)
    return null
  }
}
