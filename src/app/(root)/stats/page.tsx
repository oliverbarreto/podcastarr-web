"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts"
import { EpisodeCardCompact } from "@/components/episode-card-compact"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Headphones, Hash, Radio } from "lucide-react"
import {
  ChartConfig,
  ChartContainer
  //   ChartTooltip,
  //   ChartTooltipContent
} from "@/components/ui/chart"
import {
  getEpisodesByKeyword,
  getEpisodesByMonth,
  getEpisodesBySelectedKeyword,
  getEpisodesBySelectedMonth,
  getTotalCounts
} from "@/actions/stats_page_actions"
import type { VideoStats } from "@/lib/api-client"

const keywordChartConfig = {
  count: {
    label: "Episodes",
    color: "hsl(var(--primary))"
  }
} satisfies ChartConfig

const monthChartConfig = {
  count: {
    label: "Episodes",
    color: "hsl(var(--primary))"
  }
} satisfies ChartConfig

export default function StatsPage() {
  const { toast } = useToast()
  const [keywordData, setKeywordData] = useState<
    { keyword: string; count: number }[]
  >([])
  const [monthData, setMonthData] = useState<
    { month: string; count: number }[]
  >([])
  const [totalCounts, setTotalCounts] = useState<{
    totalEpisodes: number
    totalKeywords: number
    totalListeningTime?: number
  }>({
    totalEpisodes: 0,
    totalKeywords: 0,
    totalListeningTime: 0
  })
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [filteredEpisodes, setFilteredEpisodes] = useState<VideoStats[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [keywordResult, monthResult, countsResult] = await Promise.all([
          getEpisodesByKeyword(),
          getEpisodesByMonth(),
          getTotalCounts()
        ])

        if (keywordResult.success && keywordResult.data) {
          setKeywordData(keywordResult.data)
        }
        if (monthResult.success && monthResult.data) {
          setMonthData(monthResult.data)
        }
        if (countsResult.success && countsResult.data) {
          setTotalCounts(countsResult.data)
        }
      } catch (error) {
        toast({
          title: `Error: ${error}`,
          description: "Failed to load statistics",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [toast])

  const handleKeywordClick = async (keyword: string) => {
    try {
      setIsLoading(true)
      const result = await getEpisodesBySelectedKeyword(keyword)
      if (result.success && result.data) {
        setFilteredEpisodes(result.data)
        setSelectedKeyword(keyword)
        setSelectedMonth(null)
      }
    } catch (error) {
      toast({
        title: `Error: ${error}`,
        description: "Failed to load episodes for selected keyword",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMonthClick = async (month: string) => {
    try {
      setIsLoading(true)
      const result = await getEpisodesBySelectedMonth(month)
      if (result.success && result.data) {
        setFilteredEpisodes(result.data)
        setSelectedMonth(month)
        setSelectedKeyword(null)
      }
    } catch (error) {
      toast({
        title: `Error: ${error}`,
        description: "Failed to load episodes for selected month",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearFilters = () => {
    setSelectedKeyword(null)
    setSelectedMonth(null)
    setFilteredEpisodes([])
  }

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading statistics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-row justify-between items-start mb-6">
        <h1 className="p-3 text-3xl font-bold">Podcast Statistics</h1>
        {(selectedKeyword || selectedMonth) && (
          <Button onClick={clearFilters}>Clear Filter</Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Radio className="w-14 h-14 text-primary" />
            </div>
            <div>
              <h3 className="text-6xl font-bold">
                {totalCounts.totalEpisodes}
              </h3>
              <p className="text-sm text-muted-foreground pt-4">
                Total Episodes
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Hash className="w-14 h-14 text-primary" />
            </div>
            <div>
              <h3 className="text-6xl font-bold">
                {totalCounts.totalKeywords}
              </h3>
              <p className="text-sm text-muted-foreground pt-4">
                Unique Keywords
              </p>
            </div>
          </div>
        </div>

        {totalCounts.totalListeningTime !== undefined &&
          totalCounts.totalListeningTime > 0 && (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Headphones className="w-14 h-14 text-primary" />
                </div>
                <div>
                  <h3 className="flex flex-col text-4xl font-bold">
                    <span>
                      {Math.floor(totalCounts.totalListeningTime / 60)} hours
                    </span>
                    <span>{totalCounts.totalListeningTime % 60} min</span>
                  </h3>
                  <p className="text-sm text-muted-foreground pt-4">
                    Total Duration
                  </p>
                </div>
              </div>
            </div>
          )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 p-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Episodes by Keywords</CardTitle>
            <CardDescription>
              Shows episodes using specific keywords
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={keywordChartConfig}>
              <BarChart data={keywordData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="keyword"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tickFormatter={(value) => value.slice(0, 15)} // Limit keyword length
                />
                {/* <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                /> */}
                <Bar
                  dataKey="count"
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                  onClick={(data) => handleKeywordClick(data.keyword)}
                  cursor="pointer"
                >
                  {keywordData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.keyword === selectedKeyword
                          ? "hsl(var(--primary))" // Selected bar
                          : "hsl(var(--muted-foreground))" // Unselected bars
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Click on a bar to filter episodes by keyword
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Episodes by Month</CardTitle>
            <CardDescription>
              Monthly distribution of episode releases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={monthChartConfig}>
              <BarChart data={monthData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                {/* <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                /> */}
                <Bar
                  dataKey="count"
                  radius={[8, 8, 0, 0]}
                  onClick={(data) => handleMonthClick(data.month)}
                  cursor="pointer"
                >
                  {monthData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.month === selectedMonth
                          ? "hsl(var(--primary))" // Selected month
                          : "hsl(var(--muted-foreground))" // Unselected months
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Click on a bar to filter episodes by month
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Filtered Episodes Section */}
      {(selectedKeyword || selectedMonth) && (
        <div className="p-3 mt-6">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row md:items-center">
                <CardTitle>
                  {selectedKeyword
                    ? `Episodes with keyword: ${selectedKeyword}`
                    : `Episodes from: ${selectedMonth}`}
                </CardTitle>
                <p className="text-sm text-muted-foreground md:ml-4">
                  Found {filteredEpisodes.length} episode
                  {filteredEpisodes.length !== 1 ? "s" : ""}
                </p>
              </div>
              <Button onClick={clearFilters}>Clear Filter</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredEpisodes.map((episode) => (
                  <EpisodeCardCompact
                    key={episode.video_id}
                    episode={episode}
                    href={`/channel/${episode.video_id}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
