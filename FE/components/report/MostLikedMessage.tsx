"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ChartNoAxesColumn } from "lucide-react";
import { ChatProfile } from "../chat/ChatProfile";

// 더미 데이터
const dummyLikedMessages = [
  { senderId: 'user1', msgId: 101, imgSrc: 'https://ca.slack-edge.com/E01DL1Z9D6Z-U085L9ZRDQW-21ecc433d650-512', nickname: '이동석', time: '오후 2:30', content: '외워서 푸는 건 한계가 있어요. 원리를 알고 코드를 짜면 언젠가 분명히 실력이 폭발합니다.', showProfile: true, fileUrl: null, isUpdated: 0, likes: 152 },
  { senderId: 'user2', msgId: 102, imgSrc: 'https://ca.slack-edge.com/T01GNAFL1MX-U08GSGL5ZK3-0c7f0765f91c-512', nickname: '박은채', time: '오전 10:15', content: '<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://abundant-carver-c3f.notion.site/2-1bfd5b3e6ec5805f8692e887523a3441?pvs=4">목요일 시험대비 유형별 문제 리스핏니다</a><br>문제 다풀어서 풀거없다 하는 알고리즘 똑똑이들이나 저처럼 플레문제 따위는 시원하게 포기한 헛똑똑이들은 참고하세욧</p>', showProfile: true, fileUrl: null, isUpdated: 1, likes: 128 },
  { senderId: 'user3', msgId: 103, imgSrc: 'https://ca.slack-edge.com/T01GNAFL1MX-U08GJQ125LL-3323bcb28d3c-512', nickname: '이찬석', time: '오후 11:09', content: '<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://velog.io/@qnfrma1997/%EC%A0%95%EA%B8%80-CPH-Competitive-Companion%EC%9D%8[…]EC%8A%A4%ED%8A%B8-%EC%84%A4%EC%A0%95-%EA%B0%80%EC%9D%B4%EB%93%9C">📖[정글]백준 자동 테스트 설정 가이드📖</a><br>백준 문제풀이에 도움되는 내용 공유합니다. 정글 301호 1주차 4팀 "윤석주"님이 알려주신 내용을 바탕으로 작성했습니다.</p>', showProfile: true, fileUrl: null, isUpdated: 0, likes: 98 },
  { senderId: 'user4', msgId: 104, imgSrc: 'https://ca.slack-edge.com/T01GNAFL1MX-U08H51V5SL8-35035abc83f0-512', nickname: '정진영', time: '오후 1:34', content: '<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://testcase.ac/">https://testcase.ac/</a><br>백준 문제 반례찾는 사이트입니다. <br>디버깅할 때 도움되실 것 같아 올립니다.</p>', showProfile: true, fileUrl: null, isUpdated: 0, likes: 85 },
  { senderId: 'user5', msgId: 105, imgSrc: 'https://ca.slack-edge.com/T01GNAFL1MX-U08GGJ0EJ9H-41b5bf6984ab-512', nickname: '원준석', time: '오전 11:13', content: '배상원 교수님 알고리즘 설계 기법 특강 정리한 pdf 파일도 공유드립니다~', showProfile: true, fileUrl: 'https://file-import-s3-bucket.s3.amazonaws.com/uploads/250321_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98%20%EC%84%A4%EA%B3%84%20%EA%B8%B0%EB%B2%95%20%ED%8A%B9%EA%B0%95.pdf', isUpdated: 0, likes: 77 },
  { senderId: 'user6', msgId: 106, imgSrc: 'https://ca.slack-edge.com/T01GNAFL1MX-U08GJQCGGHJ-878acb84c995-512', nickname: '김준혁', time: '오후 8:21', content: '<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.cs.usfca.edu/~galles/visualization/Algorithms.html"><strong>Data Structure Visualizations</strong></a><br>알고리즘의 시각화로 이해를 돕는 사이트를 발견해 공유드립니다!</p>', showProfile: true, fileUrl: null, isUpdated: 0, likes: 65 },
  { senderId: 'user10', msgId: 110, imgSrc: 'https://ca.slack-edge.com/T01GNAFL1MX-U08H513B9ME-c0e6693451d6-512', nickname: '이도연', time: '오후 5:29', content: '<p>📢<span class="font-bold">Q&A</span><br>조금 전 점심시간에 방효식 코치님께<br>퀴즈를 태블릿에다가 <code>디지타이저 펜(S펜, 애플펜슬)</code>을 이용해 푼 뒤<br>스크린샷으로 제출해도 되냐고 여쭤봤더니<br>그래도 된다고 하셨습니다.<br><br>참고하세요~</p>', showProfile: true, fileUrl: null, isUpdated: 0, likes: 51 },  
  { senderId: 'user8', msgId: 108, imgSrc: 'https://ca.slack-edge.com/T01GNAFL1MX-U08G8LJ0Z2A-78a6c503d0d4-512', nickname: '고재웅', time: '오전 9:56', content: '<p><strong>하노이의 탑 시뮬레이션</strong><br><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.mathsisfun.com/games/towerofhanoi.html">https://www.mathsisfun.com/games/towerofhanoi.html</a><br>칠판에 하노이탑 <code><strong>1,000번쯤</code></strong> 그리다 발견한 사이트입니다!!!</p>', showProfile: true, fileUrl: null, isUpdated: 0, likes: 48 },
  { senderId: 'user9', msgId: 109, imgSrc: 'https://ca.slack-edge.com/T01GNAFL1MX-U08G8LYTZEJ-5763f312baed-512', nickname: '조현호', time: '오후 4:31', content: '반복문으로 풀다가 재귀로 바꾸니 코드가 더 간결해졌어요😆', showProfile: true, fileUrl: null, isUpdated: 0, likes: 32 },  
];

export function MostLikedMessage() {
    return (
        <Card className="pt-8">
            {/* 차트 제목 */}
            <CardHeader className="flex items-center gap-2 space-y-0 border-b">
                <div className="grid flex-1 gap-1">
                    <CardTitle className="text-lg">Top 10 Messages</CardTitle>
                    <CardDescription>
                        Top 10 messages got most likes
                    </CardDescription>
                </div>
            </CardHeader>
            {/* 차트 내용 */}
            <CardContent>
                <div className="flex flex-col gap-2 py-2">
                    {dummyLikedMessages.map((msg) => (
                        <div key={msg.msgId} className="flex items-center justify-between bg-muted hover:bg-gray-200 rounded-lg pr-2">
                            <div className="flex-grow">
                                {/* 메시지 */}
                                <ChatProfile
                                    senderId={msg.senderId}
                                    msgId={msg.msgId}
                                    imgSrc={msg.imgSrc}
                                    nickname={msg.nickname}
                                    time={msg.time}
                                    content={msg.content}
                                    showProfile={msg.showProfile}
                                    fileUrl={msg.fileUrl}
                                    isUpdated={msg.isUpdated}
                                    className="hover:bg-transparent"
                                />
                            </div>
                            <div className="flex flex-none justify-start items-center gap-2 w-16">
                                <span className="text-lg font-bold text-red-500">♥</span>
                                <span className="font-semibold text-foreground">{msg.likes}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            {/* 차트 하단 */}
            <CardFooter className="flex-col items-start gap-2 text-sm">                
                <div className="flex gap-1 text-muted-foreground leading-none">
                    <ChartNoAxesColumn className="h-4 w-4" />
                    Showing top 10 Messages since the tab created
                </div>
            </CardFooter>
        </Card>
    );
}