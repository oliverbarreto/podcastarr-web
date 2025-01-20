import { fetchChannel } from "@/lib/api/channel"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  CalendarDays,
  Globe,
  Languages,
  ListFilter,
  AlertTriangle
} from "lucide-react"

async function getChannelData() {
  try {
    const channel = await fetchChannel()
    return {
      success: true,
      data: channel
    }
  } catch (error) {
    console.error("Error fetching channel:", error)
    return {
      success: false,
      error: "Failed to load channel information"
    }
  }
}

export default async function PublicChannelPage() {
  const result = await getChannelData()

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
        <p className="text-muted-foreground">{result.error}</p>
      </div>
    )
  }

  const channel = result.data

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-8">
        {/* Channel Image */}
        {channel.imageUrl && (
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
            <img
              src={channel.imageUrl}
              alt={channel.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Channel Title */}
        <h1 className="text-4xl font-bold text-center">{channel.title}</h1>

        {/* Channel Description */}
        <p className="text-xl text-muted-foreground text-center max-w-2xl">
          {channel.description}
        </p>

        {/* Channel Details */}
        <div className="w-full max-w-2xl space-y-4">
          {/* Website URL */}
          {channel.websiteUrl && (
            <div className="flex items-center p-4 rounded-lg border bg-card">
              <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0 mr-3" />
              <div className="flex-grow grid grid-cols-[120px_1fr] items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Website URL:
                </span>
                <a
                  href={channel.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {channel.websiteUrl}
                </a>
              </div>
            </div>
          )}

          {/* Language */}
          <div className="flex items-center p-4 rounded-lg border bg-card">
            <Languages className="h-5 w-5 text-muted-foreground flex-shrink-0 mr-3" />
            <div className="flex-grow grid grid-cols-[120px_1fr] items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Language:
              </span>
              <span>{channel.language}</span>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center p-4 rounded-lg border bg-card">
            <ListFilter className="h-5 w-5 text-muted-foreground flex-shrink-0 mr-3" />
            <div className="flex-grow grid grid-cols-[120px_1fr] items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Category:
              </span>
              <div className="inline-flex">
                <Badge variant="outline">{channel.category}</Badge>
              </div>
            </div>
          </div>

          {/* Explicit Content */}
          {channel.explicitContent && (
            <div className="flex items-center p-4 rounded-lg border bg-card">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mr-3" />
              <div className="flex-grow grid grid-cols-[120px_1fr] items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Content Rating:
                </span>
                <div className="inline-flex">
                  <Badge variant="destructive">Explicit Content</Badge>
                </div>
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="flex items-center p-4 rounded-lg border bg-card">
            <CalendarDays className="h-5 w-5 text-muted-foreground flex-shrink-0 mr-3" />
            <div className="flex-grow grid grid-cols-[120px_1fr]">
              <span className="text-sm font-medium text-muted-foreground">
                Channel Dates:
              </span>
              <div className="space-y-1">
                <p className="text-sm">
                  Created: {formatDate(channel.createdAt)}
                </p>
                <p className="text-sm">
                  Last updated: {formatDate(channel.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
