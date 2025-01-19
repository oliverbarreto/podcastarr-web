"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { addEpisode } from "@/actions/channel_page_actions"
import type { PodcastEpisode } from "@/types/podcast"

interface AddEpisodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (episode: PodcastEpisode) => void
}

export function AddEpisodeDialog({
  open,
  onOpenChange,
  onSuccess
}: AddEpisodeDialogProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await addEpisode(youtubeUrl)
      if (result.success && result.data) {
        // Convert keywords string to array of tags if present, otherwise use empty array
        const tags = result.data.keywords
          ? result.data.keywords.split(",").map((tag: string) => tag.trim())
          : []

        const episodeWithTags = {
          ...result.data,
          tags // Use the processed tags array
        }
        onSuccess(episodeWithTags)
        onOpenChange(false)
        setYoutubeUrl("")
      } else {
        setError(result.error || "Failed to create episode")
      }
    } catch (error) {
      setError(`Failed to create episode: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Episode from YouTube</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtubeUrl">YouTube Video URL</Label>
            <Input
              id="youtubeUrl"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Episode"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
