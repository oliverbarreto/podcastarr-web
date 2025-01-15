"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { ArrowLeft, Pencil, Trash, Calendar } from "lucide-react"
import type { PodcastEpisode } from "@/types/podcast"
import {
  getEpisode,
  removeEpisodeById
} from "@/actions/episode_details_actions"
import { AddEpisodeDialog } from "@/components/add-episode-dialog"

const tagColors = [
  "bg-pink-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-orange-500"
]

type RouteParams = {
  episodeId: string
}

export default function EpisodeDetailsPage() {
  const router = useRouter()
  const params = useParams<RouteParams>()
  const { toast } = useToast()
  const [episode, setEpisode] = useState<PodcastEpisode | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  useEffect(() => {
    const loadEpisode = async () => {
      if (!params.episodeId) return
      try {
        const result = await getEpisode(Number(params.episodeId))
        if (result?.success && result.data) {
          setEpisode(result.data)
        } else {
          toast({
            title: "Error",
            description: "Failed to load episode",
            variant: "destructive"
          })
          router.push("/channel")
        }
      } catch {
        toast({
          title: "Error",
          description: "Failed to load episode",
          variant: "destructive"
        })
        router.push("/channel")
      } finally {
        setIsLoading(false)
      }
    }

    loadEpisode()
  }, [params.episodeId, router, toast])

  const handleDelete = async () => {
    try {
      const result = await removeEpisodeById(Number(params.episodeId))
      if (result.success) {
        toast({
          title: "Success",
          description: "Episode deleted successfully"
        })
        router.push("/channel")
      } else {
        toast({
          title: "Error",
          description: "Failed to delete episode",
          variant: "destructive"
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete episode",
        variant: "destructive"
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container max-w-3xl mx-auto py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading episode details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!episode) return null

  return (
    <div className="container max-w-4xl mx-auto py-10">
      <Button
        variant="ghost"
        className="flex items-center gap-2 mb-8"
        onClick={() => router.push("/channel")}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Channel
      </Button>

      <div className="space-y-8">
        <div className="aspect-video w-full relative rounded-lg overflow-hidden bg-muted">
          {episode.imageUrl ? (
            <Image
              src={episode.imageUrl}
              alt={episode.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground">No image available</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{episode.title}</h1>
          <p className="text-lg text-muted-foreground whitespace-pre-wrap">
            {episode.description}
          </p>
        </div>

        {episode.audioFileUrl && (
          <div className="w-full bg-card rounded-lg p-4">
            <audio controls className="w-full h-8">
              <source src={episode.audioFileUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div className="space-y-2 pt-4">
          <div className="flex flex-wrap gap-2">
            {episode.tags.map((tag, index) => (
              <span
                key={tag}
                className={`${
                  tagColors[index % tagColors.length]
                } text-white px-3 py-1 rounded-full text-sm`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-start pt-8 border-t">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                Created: {new Date(episode.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                Updated: {new Date(episode.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowEditDialog(true)}
            >
              <Pencil className="w-4 h-4" />
              Edit Episode
            </Button>
            <Button
              variant="destructive"
              className="flex items-center gap-2"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash className="w-4 h-4" />
              Delete Episode
            </Button>
          </div>
        </div>
      </div>

      <AddEpisodeDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSuccess={(updatedEpisode) => setEpisode(updatedEpisode)}
        episode={episode}
        mode="edit"
      />

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Episode</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this episode? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
