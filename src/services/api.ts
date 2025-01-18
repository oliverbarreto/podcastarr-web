import { PodcastChannel } from "@/types/podcast_channel"
import { PodcastEpisode } from "@/types/podcast"
import { ApiErrorResponse, ApiValidationError } from "@/types/api"
import { config } from "@/config"

export const channelApi = {
  async getChannel(): Promise<PodcastChannel> {
    try {
      const response = await fetch(`${config.api.baseUrl}/channel`, {
        method: "GET",
        headers: {
          accept: "application/json"
        }
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Channel not found")
        }
        throw new Error("Failed to fetch channel")
      }

      const data = await response.json()
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        authors: data.authors,
        authors_email: data.authors_email,
        owner: data.owner,
        owner_email: data.owner_email,
        language: data.language,
        image_url: data.image_url || null,
        explicit: Boolean(data.explicit),
        website_url: data.website_url || "",
        category: data.category || "Technology",
        createdAt: data.created_at ? new Date(data.created_at) : undefined,
        updatedAt: data.updated_at ? new Date(data.updated_at) : undefined
      }
    } catch (error) {
      throw error
    }
  },

  async updateChannel(
    channelData: Omit<PodcastChannel, "id">
  ): Promise<PodcastChannel> {
    try {
      console.log("Updating channel with data:", channelData)

      const response = await fetch(`${config.api.baseUrl}/channel`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: channelData.name,
          description: channelData.description,
          authors: channelData.authors,
          authors_email: channelData.authors_email,
          owner: channelData.owner,
          owner_email: channelData.owner_email,
          language: channelData.language,
          image_url: channelData.image_url,
          explicit: channelData.explicit,
          website_url: channelData.website_url || "",
          category: channelData.category || "Technology"
        })
      })

      if (!response.ok) {
        const errorData = (await response
          .json()
          .catch(() => null)) as ApiErrorResponse | null
        console.error("Update channel error response:", {
          status: response.status,
          statusText: response.statusText,
          errorData
        })

        if (errorData?.detail && Array.isArray(errorData.detail)) {
          const errorMessages = errorData.detail
            .map((err: ApiValidationError) => err.msg)
            .join(", ")
          throw new Error(`Validation error: ${errorMessages}`)
        }

        const errorMessage =
          typeof errorData?.detail === "string"
            ? errorData.detail
            : `Failed to update channel: ${response.status} ${response.statusText}`
        throw new Error(errorMessage)
      }

      const data = await response.json()
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        authors: data.authors,
        authors_email: data.authors_email,
        owner: data.owner,
        owner_email: data.owner_email,
        language: data.language,
        image_url: data.image_url || null,
        explicit: Boolean(data.explicit),
        website_url: data.website_url || "",
        category: data.category || "Technology",
        createdAt: data.created_at ? new Date(data.created_at) : undefined,
        updatedAt: data.updated_at ? new Date(data.updated_at) : undefined
      }
    } catch (error) {
      console.error("Error in updateChannel:", error)
      throw error
    }
  }
}

export const episodeApi = {
  async getEpisodes(): Promise<PodcastEpisode[]> {
    try {
      const response = await fetch(`${config.api.baseUrl}/episodes`, {
        method: "GET",
        headers: {
          accept: "application/json"
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch episodes")
      }

      return response.json()
    } catch (error) {
      throw error
    }
  },

  async getEpisode(id: number): Promise<PodcastEpisode> {
    try {
      const response = await fetch(`${config.api.baseUrl}/episodes/${id}`, {
        method: "GET",
        headers: {
          accept: "application/json"
        }
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Episode not found")
        }
        throw new Error("Failed to fetch episode")
      }

      return response.json()
    } catch (error) {
      throw error
    }
  },

  async createEpisode(
    episodeData: Omit<PodcastEpisode, "id" | "createdAt" | "updatedAt">
  ): Promise<PodcastEpisode> {
    try {
      const response = await fetch(`${config.api.baseUrl}/episodes`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(episodeData)
      })

      if (!response.ok) {
        throw new Error("Failed to create episode")
      }

      return response.json()
    } catch (error) {
      throw error
    }
  },

  async updateEpisode(
    id: number,
    episodeData: Partial<PodcastEpisode>
  ): Promise<PodcastEpisode> {
    try {
      const response = await fetch(`${config.api.baseUrl}/episodes/${id}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(episodeData)
      })

      if (!response.ok) {
        throw new Error("Failed to update episode")
      }

      return response.json()
    } catch (error) {
      throw error
    }
  },

  async deleteEpisode(id: number): Promise<void> {
    try {
      const response = await fetch(`${config.api.baseUrl}/episodes/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json"
        }
      })

      if (!response.ok) {
        throw new Error("Failed to delete episode")
      }
    } catch (error) {
      throw error
    }
  }
}
