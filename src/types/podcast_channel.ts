export type PodcastChannel = {
  id: number
  name: string
  description: string
  authors: string
  authors_email: string
  owner: string
  owner_email: string
  language: string
  image_url: string | null
  explicit: boolean
  website_url: string
  category: string
  createdAt?: Date
  updatedAt?: Date
}
