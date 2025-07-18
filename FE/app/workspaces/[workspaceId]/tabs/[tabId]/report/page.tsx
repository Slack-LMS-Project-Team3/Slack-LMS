"use client";

import LearnerCounts from "@/components/report/LearnerCounts";
import { LearnerTrend } from "@/components/report/LearnerTrend";
import { MostActiveByMessage } from "@/components/report/MostActiveByMessage";
import { MostActiveByReaction } from "@/components/report/MostActiveByReaction";
import { Separator } from "@/components/ui/separator";
import { MostLikedMessage } from "@/components/report/MostLikedMessage";


export default function ReportPage() {
    return (
        <div className="flex flex-col w-full h-full overflow-y-auto scrollbar-thin items-center">
            <div className="w-full px-10 pb-10">
                <div className="flex flex-1 w-full px-5">
                    <div className="flex-1">
                        {/* 학습자 수 */}
                        <LearnerCounts />
                    </div>
                </div>                
                <Separator className="my-2" />
                <div className="flex flex-1 w-full px-5 pt-15">
                    <div className="flex-1">
                        {/* 학습자 추이 */}
                        <LearnerTrend />
                    </div>
                </div>                
                <Separator className="my-2" />
                <div className="grid grid-cols-2 gap-4 px-5 pt-15">
                    {/* 메시지 가장 활발한 학습자 */}
                    <MostActiveByMessage />
                    {/* 리액션이 가장 활발한 학습자 */}
                    <MostActiveByReaction />
                </div>
                <Separator className="my-2" />
                <div className="flex flex-1 w-full px-5 pt-15">
                    <div className="flex-1">
                        {/* 좋아요 가장 많은 메시지 */}
                        <MostLikedMessage />
                    </div>
                </div>
                <Separator className="my-2" />
            </div>
        </div>

    );
}

