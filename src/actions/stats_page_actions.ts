"use server"

import { fetchStats, fetchTotalStats, type VideoStats } from "@/lib/api-client"

type KeywordCount = {
  keyword: string
  count: number
}

type MonthCount = {
  month: string
  count: number
}

function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  return date instanceof Date && !isNaN(date.getTime())
}

function safeParseDate(dateStr: string): Date {
  try {
    // First try direct parsing
    const date = new Date(dateStr)
    if (isValidDate(dateStr)) return date

    // If that fails, try to fix common issues
    // Fix years with extra digits (e.g., 20245 -> 2024)
    const fixedDateStr = dateStr.replace(/(\d{5,})-/, (match) => {
      const year = match.slice(0, 4)
      return `${year}-`
    })

    const fixedDate = new Date(fixedDateStr)
    if (isValidDate(fixedDateStr)) return fixedDate

    // If all else fails, return current date
    return new Date()
  } catch {
    return new Date()
  }
}

export async function getEpisodesByKeyword(): Promise<{
  success: boolean
  data?: KeywordCount[]
  error?: string
}> {
  try {
    const { data: episodes } = await fetchStats(0, 100)

    // Process keywords and count occurrences
    const keywordCounts: { [key: string]: number } = {}
    episodes.forEach((episode: VideoStats) => {
      const keywords = episode.keywords || []
      keywords.forEach((keyword: string) => {
        const cleanKeyword = keyword.trim()
        if (cleanKeyword) {
          keywordCounts[cleanKeyword] = (keywordCounts[cleanKeyword] || 0) + 1
        }
      })
    })

    // Convert to array format for the chart
    const data = Object.entries(keywordCounts)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count)

    return { success: true, data }
  } catch (error) {
    console.error("Failed to fetch episodes by keyword:", error)
    return { success: false, error: String(error) }
  }
}

export async function getEpisodesByMonth(): Promise<{
  success: boolean
  data?: MonthCount[]
  error?: string
}> {
  try {
    const { data: episodes } = await fetchStats(0, 100)

    // Process dates and count episodes per month
    const monthCounts: { [key: string]: number } = {}
    episodes.forEach((episode: VideoStats) => {
      const date = safeParseDate(episode.last_accessed)
      const monthYear = date.toLocaleString("en-US", {
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
    return { success: false, error: String(error) }
  }
}

export async function getEpisodesBySelectedKeyword(
  keyword: string
): Promise<{ success: boolean; data?: VideoStats[]; error?: string }> {
  try {
    const { data: episodes } = await fetchStats(0, 100)

    const filteredEpisodes = episodes.filter((episode: VideoStats) =>
      episode.keywords.some((k: string) => k.trim() === keyword)
    )

    return {
      success: true,
      data: filteredEpisodes
    }
  } catch (error) {
    console.error("Failed to fetch episodes by selected keyword:", error)
    return { success: false, error: String(error) }
  }
}

export async function getEpisodesBySelectedMonth(
  month: string
): Promise<{ success: boolean; data?: VideoStats[]; error?: string }> {
  try {
    const { data: episodes } = await fetchStats(0, 100)

    const [monthName, year] = month.split(" ")
    const startDate = new Date(`${monthName} 1, ${year}`)
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + 1)

    const filteredEpisodes = episodes.filter((episode: VideoStats) => {
      const episodeDate = safeParseDate(episode.last_accessed)
      return episodeDate >= startDate && episodeDate < endDate
    })

    return {
      success: true,
      data: filteredEpisodes
    }
  } catch (error) {
    console.error("Failed to fetch episodes by selected month:", error)
    return { success: false, error: String(error) }
  }
}

export async function getTotalCounts(): Promise<{
  success: boolean
  data?: {
    totalEpisodes: number
    totalKeywords: number
    totalListeningTime?: number
  }
  error?: string
}> {
  try {
    const [{ data: episodes }, totals] = await Promise.all([
      fetchStats(0, 100),
      fetchTotalStats()
    ])

    // Get unique keywords across all episodes
    const uniqueKeywords = new Set<string>()
    episodes.forEach((episode: VideoStats) => {
      episode.keywords.forEach((keyword: string) => {
        const cleanKeyword = keyword.trim()
        if (cleanKeyword) uniqueKeywords.add(cleanKeyword)
      })
    })

    // Calculate total listening time from durations
    const totalListeningTime = episodes.reduce(
      (total: number, episode: VideoStats) => {
        return total + (episode.duration || 0)
      },
      0
    )

    const result = {
      totalEpisodes: totals.total_episodes,
      totalKeywords: uniqueKeywords.size,
      totalListeningTime: totalListeningTime
    }

    return {
      success: true,
      data: result
    }
  } catch (error) {
    console.error("Failed to fetch total counts:", error)
    return { success: false, error: String(error) }
  }
}
