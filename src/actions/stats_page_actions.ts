"use server"

import { prisma } from "@/lib/prisma"
import type { PodcastEpisode } from "@/types/podcast"

type TagCount = {
  tag: string
  count: number
}

type MonthCount = {
  month: string
  count: number
}

export async function getEpisodesByTag(): Promise<{
  success: boolean
  data?: TagCount[]
  error?: string
}> {
  try {
    const episodes = await prisma.podcastEpisode.findMany({
      select: { tags: true }
    })

    // Process tags and count occurrences
    const tagCounts: { [key: string]: number } = {}
    episodes.forEach((episode) => {
      const tags = episode.tags
        ? episode.tags.split(",").map((t) => t.trim())
        : []
      tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    // Convert to array format for the chart
    const data = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)

    return { success: true, data }
  } catch (error) {
    console.error("Failed to fetch episodes by tag:", error)
    return { success: false, error: "Failed to fetch episodes by tag" }
  }
}

export async function getEpisodesByMonth(): Promise<{
  success: boolean
  data?: MonthCount[]
  error?: string
}> {
  try {
    const episodes = await prisma.podcastEpisode.findMany({
      select: { createdAt: true }
    })

    // Process dates and count episodes per month
    const monthCounts: { [key: string]: number } = {}
    episodes.forEach((episode) => {
      const monthYear = new Date(episode.createdAt).toLocaleString("en-US", {
        month: "long",
        year: "numeric"
      })
      monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1
    })

    // Convert to array format for the chart
    const data = Object.entries(monthCounts)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => {
        const dateA = new Date(a.month)
        const dateB = new Date(b.month)
        return dateB.getTime() - dateA.getTime()
      })

    return { success: true, data }
  } catch (error) {
    console.error("Failed to fetch episodes by month:", error)
    return { success: false, error: "Failed to fetch episodes by month" }
  }
}

export async function getEpisodesBySelectedTag(
  tag: string
): Promise<{ success: boolean; data?: PodcastEpisode[]; error?: string }> {
  try {
    const episodes = await prisma.podcastEpisode.findMany({
      where: {
        tags: { contains: tag }
      },
      orderBy: { createdAt: "desc" }
    })

    return {
      success: true,
      data: episodes.map((episode) => ({
        ...episode,
        tags: episode.tags ? episode.tags.split(",").map((t) => t.trim()) : []
      }))
    }
  } catch (error) {
    console.error("Failed to fetch episodes by selected tag:", error)
    return { success: false, error: "Failed to fetch episodes by selected tag" }
  }
}

export async function getEpisodesBySelectedMonth(
  month: string
): Promise<{ success: boolean; data?: PodcastEpisode[]; error?: string }> {
  try {
    const [monthName, year] = month.split(" ")
    const startDate = new Date(`${monthName} 1, ${year}`)
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + 1)

    const episodes = await prisma.podcastEpisode.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return {
      success: true,
      data: episodes.map((episode) => ({
        ...episode,
        tags: episode.tags ? episode.tags.split(",").map((t) => t.trim()) : []
      }))
    }
  } catch (error) {
    console.error("Failed to fetch episodes by selected month:", error)
    return {
      success: false,
      error: "Failed to fetch episodes by selected month"
    }
  }
}

export async function getTotalCounts(): Promise<{
  success: boolean
  data?: {
    totalEpisodes: number
    totalTags: number
    totalListeningTime?: number // in minutes, if we have duration data
  }
  error?: string
}> {
  try {
    const episodes = await prisma.podcastEpisode.findMany({
      select: {
        tags: true,
        duration: true
      }
    })

    // Get unique tags across all episodes
    const uniqueTags = new Set<string>()
    episodes.forEach((episode) => {
      const tags = episode.tags
        ? episode.tags.split(",").map((t) => t.trim())
        : []
      tags.forEach((tag) => uniqueTags.add(tag))
    })

    // Calculate total listening time if duration is available
    const totalListeningTime = episodes.reduce((total, episode) => {
      return total + (episode.duration || 0)
    }, 0)

    return {
      success: true,
      data: {
        totalEpisodes: episodes.length,
        totalTags: uniqueTags.size,
        totalListeningTime: totalListeningTime
      }
    }
  } catch (error) {
    console.error("Failed to fetch total counts:", error)
    return { success: false, error: "Failed to fetch total counts" }
  }
}
