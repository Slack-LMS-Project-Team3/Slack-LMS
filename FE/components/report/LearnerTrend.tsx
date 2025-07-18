"use client"

import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 더미 데이터
const chartData = [
  { date: "2024-01-01", Invited: 26, Completed: 70 },
  { date: "2024-01-15", Invited: 0, Completed: 52 },
  { date: "2024-02-01", Invited: 32, Completed: 0 },    
  { date: "2024-03-01", Invited: 80, Completed: 0 },
  { date: "2024-03-15", Invited: 0, Completed: 26 },
  { date: "2024-04-01", Invited: 0, Completed: 32 },
  { date: "2024-05-01", Invited: 32, Completed: 80 },
  { date: "2024-06-01", Invited: 26, Completed: 0 },
  { date: "2024-07-01", Invited: 62, Completed: 56 },
  { date: "2024-08-01", Invited: 0, Completed: 0 },
  { date: "2024-09-01", Invited: 91, Completed: 62 },
  { date: "2024-10-01", Invited: 0, Completed: 0 },
  { date: "2024-11-01", Invited: 32, Completed: 91 },
  { date: "2024-12-01", Invited: 69, Completed: 0 },  
]

// 차트 색상 설정
const chartConfig = {
  Invited: {
    label: "Invited",
    color: "var(--chart-1)",
  },
  Completed: {
    label: "Completed",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function LearnerTrend() {
  
  // 기간 필터 상태 관리
  const [timeRange, setTimeRange] = React.useState("12m")

  // 데이터 계산 (실제로는 API에서 데이터를 가져와야 할 수도 있음)
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      {/* 차트 제목 */}
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg">Monthly Trends of Learners</CardTitle>
          <CardDescription>
            Showing total invited vs completed learners for the selected period
          </CardDescription>
        </div>
        {/* 기간 필터 */}
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 12 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="12m" className="rounded-lg">
              Last 12 months
            </SelectItem>
            <SelectItem value="6m" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="3m" className="rounded-lg">
              Last 3 months
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      {/* 차트 내용 */}
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
              }
            />            
            <Line
              dataKey="Invited"
              type="monotone"
              stroke="var(--color-Invited)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Completed"
              type="monotone"
              stroke="var(--color-Completed)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
