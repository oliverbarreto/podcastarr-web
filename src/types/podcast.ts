export type PodcastEpisode = {
  id: number
  title: string
  description: string
  imageUrl: string | null
  audioFileUrl: string | null
  duration: number | null
  publishedAt: Date
  tags: string
  createdAt: Date
  updatedAt: Date
}
