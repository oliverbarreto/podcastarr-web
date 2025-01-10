"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { User, Podcast, Info, Mail, LinkIcon } from "lucide-react"
import {
  getCurrentChannel,
  updateChannel
} from "@/actions/profile_page_actions"
import { useProfileStore } from "@/store/profile-store"

// Create a type based on your Prisma schema
type PodcastChannel = {
  id: number
  title: string
  description: string
  userName: string
  userEmail: string
  imageUrl: string | null
  explicitContent: boolean
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [channelInfo, setChannelInfo] = useState<PodcastChannel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { updateProfile } = useProfileStore()

  useEffect(() => {
    let mounted = true

    const loadChannel = async () => {
      try {
        const channel = await getCurrentChannel()
        if (mounted && channel) {
          setChannelInfo(channel)
        }
      } catch (error) {
        toast({
          title: `Error: ${error}`,
          description: "Failed to load channel information",
          variant: "destructive"
        })
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadChannel()
    return () => {
      mounted = false
    }
  }, [toast])

  if (isLoading) {
    return (
      <div className="container max-w-3xl mx-auto py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">
              Loading channel information...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Podcast className="w-8 h-8" />
          Podcast Channel Information
        </h1>
        <p className="text-muted-foreground mt-2 py-4">
          Configure your podcast channel settings and information.
        </p>
      </div>

      <form
        action={async (formData) => {
          if (isSubmitting) return
          setIsSubmitting(true)
          try {
            const result = await updateChannel(formData)

            if (result.success && result.data) {
              setChannelInfo(result.data)
              updateProfile(result.data.imageUrl, result.data.userName)
              toast({
                title: "Success",
                description: "Channel information updated successfully"
              })
            } else {
              throw new Error(result.error || "Failed to update channel")
            }
          } catch (error) {
            console.error("Form submission error:", error)
            toast({
              title: "Error",
              description:
                error instanceof Error
                  ? error.message
                  : "Failed to update channel information",
              variant: "destructive"
            })
          } finally {
            setIsSubmitting(false)
          }
        }}
        className="space-y-8"
      >
        {/* Channel Information Section */}
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Channel Information</h2>
          </div>
          <div className="grid gap-4 pl-7">
            <div>
              <Label htmlFor="title">Channel Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={channelInfo?.title}
                placeholder="My Awesome Podcast"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={channelInfo?.description}
                placeholder="Tell us about your podcast..."
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="explicitContent"
                name="explicitContent"
                defaultChecked={channelInfo?.explicitContent}
                value="on"
              />
              <Label htmlFor="explicitContent">
                The channel episodes might contain explicit content
              </Label>
            </div>
          </div>
        </div>

        {/* Channel Image Section */}
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Channel Image</h2>
          </div>
          <div className="grid gap-4 pl-7">
            <div className="flex-1">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                defaultValue={channelInfo?.imageUrl || ""}
                placeholder="https://example.com/image.png"
              />
            </div>
            <div className="flex justify-center">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {channelInfo?.imageUrl ? (
                  <img
                    src={channelInfo.imageUrl}
                    alt="Channel Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User Information Section */}
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <h2 className="text-xl font-semibold">User Information</h2>
          </div>
          <div className="grid gap-4 pl-7">
            <div>
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                name="userName"
                defaultValue={channelInfo?.userName}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="userEmail">User Email</Label>
              <Input
                id="userEmail"
                name="userEmail"
                type="email"
                defaultValue={channelInfo?.userEmail}
                placeholder="john@example.com"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 py-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </div>
  )
}
