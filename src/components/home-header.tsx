"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddEpisodeDialog } from "@/components/add-episode-dialog"
import { useToast } from "@/hooks/use-toast"

export function HomeHeader() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold">Podcast Channel</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Episode
        </Button>
      </div>

      <AddEpisodeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={() => {
          toast({
            title: "Success",
            description: "Episode created successfully"
          })
          // Refresh the page to show the new episode
          window.location.reload()
        }}
      />
    </>
  )
}
