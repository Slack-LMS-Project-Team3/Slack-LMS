import React from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartNoAxesColumn } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 더미 데이터
const chartData = [
  { user_id: "aaaaa", nickname: "임준혁", profileImage: "https://ca.slack-edge.com/T01GNAFL1MX-U08G0RSLZ63-e8fc3d520338-512", message: 23, reaction: 80, date: "2025-07-01" },
  { user_id: "baaaa", nickname: "안유진", profileImage: "https://ca.slack-edge.com/T01GNAFL1MX-U08G0RLU339-78632c064950-512", message: 45, reaction: 45, date: "2025-06-15" },
  { user_id: "bbaaa", nickname: "신명훈", profileImage: "https://ca.slack-edge.com/T01GNAFL1MX-U08GSH9GXLH-f58b4ad3af52-512", message: 12, reaction: 35, date: "2025-05-20" },
  { user_id: "bbbaa", nickname: "박은채", profileImage: "https://ca.slack-edge.com/T01GNAFL1MX-U08GSGL5ZK3-0c7f0765f91c-512", message: 53, reaction: 73, date: "2025-07-10" },
  { user_id: "bbbba", nickname: "이찬석", profileImage: "https://ca.slack-edge.com/T01GNAFL1MX-U08GJQ125LL-3323bcb28d3c-512", message: 19, reaction: 58, date: "2024-10-05" },
  { user_id: "caaaa", nickname: "김윤석", profileImage: "https://ca.slack-edge.com/T01GNAFL1MX-U08G0QQBJGP-01e343a685ab-512", message: 30, reaction: 60, date: "2025-06-25" },
  { user_id: "ccaaa", nickname: "조현호", profileImage: "https://ca.slack-edge.com/T01GNAFL1MX-U08G8LYTZEJ-5763f312baed-512", message: 27, reaction: 38, date: "2024-08-15" },
  { user_id: "cccaa", nickname: "오수빈", profileImage: "https://ca.slack-edge.com/T01GNAFL1MX-U08GD3U1EER-737ade56d6d8-512", message: 27, reaction: 26, date: "2025-07-05" },
  { user_id: "cccca", nickname: "최효식", profileImage: "https://ca.slack-edge.com/T01GNAFL1MX-U08GGJAQK99-29a368f10ce2-512", message: 52, reaction: 62, date: "2024-09-20" },
  { user_id: "daaaa", nickname: "고재웅", profileImage: "https://ca.slack-edge.com/T01GNAFL1MX-U08G8LJ0Z2A-78a6c503d0d4-512", message: 44, reaction: 36, date: "2025-07-12" },
];

// 차트 색상 설정
const chartConfig = {
  message: {
    label: "Message",
    color: "hsl(var(--chart-1))",
  },
};

// 프로필 이미지가 표시될 위치 지정
const CustomYAxisTick = ({ x, y, payload }: any) => {
  const data = chartData.find((d) => d.nickname === payload.value);
  const imageUrl = data?.profileImage || '/user_default.png';

  return (
    <g transform={`translate(${x - 40}, ${y - 20})`}>
      {imageUrl === '/user_default.png' && (
        <rect x={0} y={0} height="36px" width="36px" fill="#9ca3af" clipPath="inset(0% round 6px)" />
      )}
      <image href={imageUrl} x={0} y={0} height="36px" width="36px" clipPath="inset(0% round 6px)" />
    </g>
  );
};

export function MostActiveByMessage() {
  
  // 기간 필터 상태 관리
  const [timeRange, setTimeRange] = React.useState("12m");

  // 데이터 계산 (실제로는 API에서 데이터를 가져와야 할 수도 있음)
  const filteredData = React.useMemo(() => {
    const now = new Date();
    let monthsToSubtract = 12;
    if (timeRange === "6m") {
      monthsToSubtract = 6;
    } else if (timeRange === "3m") {
      monthsToSubtract = 3;
    }
    const startDate = new Date(now);
    startDate.setMonth(now.getMonth() - monthsToSubtract);

    return chartData
      .filter((item) => new Date(item.date) >= startDate)
      .sort((a, b) => b.message - a.message)
      .slice(0, 10);
  }, [timeRange]);

  // 차트 높이, 바 높이, 간격 계산
  const barHeight = 40;
  const gap = 15;
  const chartHeight = 10 * (barHeight + gap);

  return (
    <Card>
      {/* 차트 제목 */}
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg">Top 10 Active Messengers</CardTitle>          
        </div>
        {/* 기간 필터 */}
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[145px] rounded-lg ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="12m" className="rounded-lg">Last 12 months</SelectItem>
            <SelectItem value="6m" className="rounded-lg">Last 6 months</SelectItem>
            <SelectItem value="3m" className="rounded-lg">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      {/* 차트 내용 */}
      <CardContent className="px-2 pt-0">
        <ChartContainer config={chartConfig} className="w-full" style={{ height: `${chartHeight}px` }}>          
          <BarChart accessibilityLayer data={filteredData} layout="vertical" margin={{ left: 0, right: 40 }} barCategoryGap="35%">
            <CartesianGrid horizontal={false} />
            <YAxis dataKey="nickname" type="category" tickLine={false} axisLine={false} tick={<CustomYAxisTick />} />
            <XAxis dataKey="message" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="message" layout="vertical" fill="var(--color-message)" radius={4} barSize={barHeight}>
              <LabelList dataKey="nickname" position="insideLeft" offset={8} className="fill-background" fontSize={13} />
              <LabelList dataKey="message" position="right" offset={8} className="fill-foreground" fontSize={13} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* 차트 설명 */}
      <CardFooter className="flex-col pl-0 ml-3 items-start gap-2 text-sm">
        <div className="flex gap-1 text-muted-foreground leading-none">
          <ChartNoAxesColumn className="h-4 w-4" />
          Showing top 10 Messengers for the selected period
        </div>
      </CardFooter>
    </Card>
  );
}
