const API_BASE_URL = "http://localhost:8000"

export type VideoStats = {
  filename: string
  video_id: string
  count: number
  last_accessed: string
  tags: string[]
  keywords: string[]
  duration: number
}

export type StatsResponse = {
  data: VideoStats[]
  total: number
  skip: number
  limit: number
}

export type TotalStats = {
  total_episodes: number
  last_added_date: string
}

// Stats API endpoints
export async function fetchStats(skip = 0, limit = 10): Promise<StatsResponse> {
  const url = `${API_BASE_URL}/stats?skip=${skip}&limit=${limit}`

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json"
      },
      cache: "no-store"
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response:", errorText)
      throw new Error(
        `Failed to fetch stats: ${response.status} ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching stats:", error)
    throw error
  }
}

export async function fetchTotalStats(): Promise<TotalStats> {
  const url = `${API_BASE_URL}/stats/totals`

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json"
      },
      cache: "no-store"
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response:", errorText)
      throw new Error(
        `Failed to fetch total stats: ${response.status} ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching total stats:", error)
    throw error
  }
}

export async function fetchVideoStats(videoId: string): Promise<VideoStats> {
  const url = `${API_BASE_URL}/stats/${videoId}`

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json"
      },
      cache: "no-store"
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response:", errorText)
      throw new Error(
        `Failed to fetch video stats: ${response.status} ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching video stats:", error)
    throw error
  }
}
