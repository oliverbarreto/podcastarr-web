"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { createEpisode } from "@/actions/channel_page_actions"
import { updateEpisodeDetails } from "@/actions/episode_details_actions"
import type { PodcastEpisode } from "@/types/podcast"

interface AddEpisodeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (episode: PodcastEpisode) => void
  episode?: PodcastEpisode // Optional episode for edit mode
  mode?: "create" | "edit"
}

export function AddEpisodeDialog({
  open,
  onOpenChange,
  onSuccess,
  episode,
  mode = "create"
}: AddEpisodeDialogProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const result =
        mode === "create"
          ? await createEpisode(formData)
          : await updateEpisodeDetails(episode!.id, formData)

      if (result.success && result.data) {
        onSuccess(result.data)
        onOpenChange(false)
        toast({
          title: `Success! 🎉`,
          description: `Episode ${
            mode === "create" ? "created" : "updated"
          } successfully.`,
          variant: "default"
        })
      } else {
        toast({
          title: "Error",
          description:
            result.error || `Failed to ${mode} episode. Please try again.`,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Episode" : "Edit Episode"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the details for your new podcast episode."
              : "Make changes to your podcast episode."}
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={episode?.title}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={episode?.description}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="audioFileUrl" className="text-right">
              Audio URL
            </Label>
            <Input
              id="audioFileUrl"
              name="audioFileUrl"
              type="url"
              defaultValue={episode?.audioFileUrl || ""}
              className="col-span-3"
              placeholder="https://example.com/audio.mp3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              defaultValue={episode?.imageUrl || ""}
              className="col-span-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={episode?.tags.join(", ")}
              className="col-span-3"
              placeholder="Separate tags with commas (e.g., music, interview, tech)"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                ? "Create Episode"
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
