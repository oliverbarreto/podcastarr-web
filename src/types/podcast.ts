export interface PodcastEpisode {
  id: string
  videoId: string
  title: string
  subtitle: string
  summary: string
  imageUrl: string
  mediaUrl: string | null
  mediaDuration: number
  publishedAt: string
  status: "pending" | "downloaded"
  author: string
  keywords: string
  createdAt: string
  updatedAt: string
  tags: string | null
}
