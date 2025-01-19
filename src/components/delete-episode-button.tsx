"use client"

import { useRouter } from "next/navigation"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { deleteEpisodeAction } from "@/actions/episode_actions"

interface DeleteEpisodeButtonProps {
  videoId: string
}

export function DeleteEpisodeButton({ videoId }: DeleteEpisodeButtonProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    const result = await deleteEpisodeAction(videoId)

    if (result.success) {
      toast({
        title: "Success",
        description: "Episode deleted successfully"
      })
      router.push("/channel")
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to delete episode",
        variant: "destructive"
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full sm:w-auto">
          <Trash className="mr-2 h-4 w-4" />
          Delete Episode
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            episode and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
