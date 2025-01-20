const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export interface Channel {
  title: string
  description: string
  websiteUrl: string
  imageUrl: string | null
  explicitContent: boolean
  language: string
  category: string
  createdAt: string
  updatedAt: string
}

export async function fetchChannel(): Promise<Channel> {
  const response = await fetch(`${API_BASE_URL}/channel`, {
    headers: {
      accept: "application/json"
    }
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  return {
    title: data.name,
    description: data.description,
    websiteUrl: data.website_url,
    imageUrl: data.image_url,
    explicitContent: data.explicit,
    language: data.language,
    category: data.category,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}
