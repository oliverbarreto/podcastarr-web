"use client"

import { useState } from "react"
import { Calendar, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import type { PodcastEpisode } from "@/types/podcast"

interface EpisodeActionsProps {
  episode: PodcastEpisode
}

export function EpisodeActions({ episode }: EpisodeActionsProps) {
  const { toast } = useToast()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = async () => {
    try {
      // TODO: Implement delete functionality when API endpoint is available
      toast({
        title: "Not implemented",
        description: "Delete functionality is not yet available",
        variant: "destructive"
      })
      setShowDeleteDialog(false)
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete episode",
        variant: "destructive"
      })
    }
  }

  return (
    <>
      <div className="flex justify-between items-start pt-8 border-t">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Created: {new Date(episode.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Updated: {new Date(episode.updatedAt).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
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
    </>
  )
}
