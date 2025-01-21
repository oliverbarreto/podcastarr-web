import { formatDistanceToNow } from "date-fns"
import { BarChart3, Clock } from "lucide-react"

interface StatsTotalsProps {
  totalEpisodes: number
  lastAddedDate: string | null
}

export function StatsTotals({
  totalEpisodes,
  lastAddedDate
}: StatsTotalsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
      <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
        <div className="p-2 rounded-full bg-primary/10">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Total Episodes
          </p>
          <p className="text-2xl font-bold">{totalEpisodes}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
        <div className="p-2 rounded-full bg-primary/10">
          <Clock className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Last Episode Added
          </p>
          <p className="text-2xl font-bold">
            {lastAddedDate
              ? formatDistanceToNow(new Date(lastAddedDate), {
                  addSuffix: true
                })
              : "No episodes yet"}
          </p>
        </div>
      </div>
    </div>
  )
}
