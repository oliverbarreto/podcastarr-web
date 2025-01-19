const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

function getFullMediaUrl(mediaUrl: string | null, videoId: string) {
  if (!mediaUrl) return null
  if (mediaUrl.startsWith("http")) return mediaUrl

  // Use the /audio/{video_id} endpoint for audio files (without /api prefix)
  return `${API_BASE_URL}/audio/${videoId}`
}

export async function fetchEpisodes(limit = 100, offset = 0) {
  const response = await fetch(
    `${API_BASE_URL}/api/downloads?limit=${limit}&offset=${offset}`,
    {
      headers: {
        accept: "application/json"
      }
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  return data.map(
    (episode: {
      id: string
      video_id: string
      title: string
      subtitle: string
      summary: string
      image_url: string
      media_url: string
      media_duration: number
      published_at: string
      status: string
      author: string
      keywords: string[]
      created_at: string
      updated_at: string
    }) => ({
      id: episode.id,
      videoId: episode.video_id,
      title: episode.title,
      subtitle: episode.subtitle,
      summary: episode.summary,
      imageUrl: episode.image_url,
      mediaUrl: getFullMediaUrl(episode.media_url, episode.video_id),
      mediaDuration: episode.media_duration,
      publishedAt: episode.published_at,
      status: episode.status,
      author: episode.author,
      keywords: episode.keywords,
      createdAt: episode.created_at,
      updatedAt: episode.updated_at
    })
  )
}

export async function createEpisode(youtubeUrl: string) {
  const encodedUrl = encodeURIComponent(youtubeUrl)

  const response = await fetch(
    `${API_BASE_URL}/api/download?url=${encodedUrl}`,
    {
      method: "POST",
      headers: {
        accept: "application/json"
      }
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  return {
    id: data.id,
    videoId: data.video_id,
    title: data.title,
    subtitle: data.subtitle,
    summary: data.summary,
    imageUrl: data.image_url,
    mediaUrl: getFullMediaUrl(data.media_url, data.video_id),
    mediaDuration: data.media_duration,
    publishedAt: data.published_at,
    status: data.status,
    author: data.author,
    keywords: data.keywords,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}

export async function fetchEpisodeById(videoId: string) {
  const response = await fetch(`${API_BASE_URL}/api/downloads/${videoId}`, {
    headers: {
      accept: "application/json"
    }
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Episode not found")
    }
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return {
    id: data.id,
    videoId: data.video_id,
    title: data.title,
    subtitle: data.subtitle,
    summary: data.summary,
    imageUrl: data.image_url,
    mediaUrl: getFullMediaUrl(data.media_url, data.video_id),
    mediaDuration: data.media_duration,
    publishedAt: data.published_at,
    status: data.status,
    author: data.author,
    keywords: data.keywords,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}
