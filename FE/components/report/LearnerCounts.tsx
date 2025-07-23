"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Sparkles, TrendingUp, ChartNoAxesColumn, ChartColumn } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";

// 더미 데이터
const chartData = { total: 1020, active: 82, completed: 908 }


export default function LearnerCounts() {
    return (
        <Card className="pt-0">
            {/* 차트 제목 */}
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 text-lg">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Learner Overview</CardTitle>
                    <CardDescription>
                        Showing Total Learners, Active Learners, Completed Learners
                    </CardDescription>
                </div>
            </CardHeader>
            {/* 차트 내용 */}
            <CardContent>                
                <div className="grid grid-cols-3 gap-6">
                    {/* 탭에 초대된 총 학습자 수 */}
                    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 dark:bg-gray-800 gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Sparkles className="h-5 w-5 fill-current text-yellow-500" />
                            <span className="font-semibold text-lg">Total</span>
                        </div>
                        <div className="text-4xl font-bold"><AnimatedNumber value={chartData.total} /></div>
                    </div>
                    {/* 탭에 초대된 현재 학습자 수 */}
                    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 dark:bg-gray-800 gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Sparkles className="h-5 w-5 fill-current text-yellow-500" />
                            <span className="font-semibold text-lg">Active</span>
                        </div>
                        <div className="text-4xl font-bold"><AnimatedNumber value={chartData.active} /></div>
                    </div>
                    {/* 탭에서 나간 수료자 수 */}
                    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 dark:bg-gray-800 gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Sparkles className="h-5 w-5 fill-current text-yellow-500" />
                            <span className="font-semibold text-lg">Completed</span>
                        </div>
                        <div className="text-4xl font-bold"><AnimatedNumber value={chartData.completed} /></div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">                
                <div className="flex gap-1 text-muted-foreground leading-none">
                    <ChartNoAxesColumn className="h-4 w-4" />
                    Showing learners since the tab created
                </div>
            </CardFooter>
        </Card>
    );
}