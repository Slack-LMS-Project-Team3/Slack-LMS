"use client";

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useMessageStore } from '@/store/messageStore';

// 1. 타입을 명확히 정의하여 코드 안정성 확보
type EmojiType = 'check' | 'pray' | 'sparkle' | 'clap' | 'like';

interface EmojiGroupMenuProps {
  msgId: number;
  userId: string;
  onClose: () => void;
  checkCnt: number;
  prayCnt: number;
  sparkleCnt: number;
  clapCnt: number;
  likeCnt: number;
  myToggle: Record<EmojiType, boolean>;
}

interface EmojiGroupProps {
  msgId: number;
  userId: string;
  onClose: () => void;
  checkCnt: number;
  prayCnt: number;
  sparkleCnt: number;
  clapCnt: number;
  likeCnt: number;
  myToggle: Record<EmojiType, boolean>;
}

const emojis: { symbol: string, type: EmojiType }[] = [
  { symbol: '✅', type: 'check' },
  { symbol: '🙏', type: 'pray' },
  { symbol: '✨', type: 'sparkle' },
  { symbol: '👏', type: 'clap' },
  { symbol: '❤️', type: 'like' },
];

const emojiSymbolMap: Record<string, EmojiType> = {
  '✅': 'check', '🙏': 'pray', '✨': 'sparkle', '👏': 'clap', '❤️': 'like'
};


export function EmojiGroupMenu({ msgId, userId, checkCnt, clapCnt, prayCnt, sparkleCnt, likeCnt, onClose, myToggle }: EmojiGroupMenuProps) {
  // 클릭된 이모지 상태 관리
  const [pressedEmoji, setPressedEmoji] = useState<string | null>(null);
  const { toggleEmoji, setTargetEmoji, setAction, toggleMyEmoji } = useMessageStore();

  const handleEmojiClick = (e: React.MouseEvent<HTMLButtonElement>, emojiSymbol: string) => {
    
    const emojiType = emojiSymbolMap[emojiSymbol];
    if (!emojiType) return;

    const countMap: Record<EmojiType, number> = {
        check: checkCnt, pray: prayCnt, sparkle: sparkleCnt, clap: clapCnt, like: likeCnt
    };
    const currentCount = countMap[emojiType];
    const isAlreadyToggled = myToggle[emojiType];
    const action = isAlreadyToggled ? 'unlike' : 'like';    
    
    if (!myToggle[emojiType]) {
      const rect = e.currentTarget.getBoundingClientRect();
      const origin = {
        x: (rect.left + rect.right) / 2 / window.innerWidth,
        y: (rect.top + rect.bottom) / 2 / window.innerHeight,
      };

      // 분수대 효과 - 솟구쳤다가 빠른 자유낙하 + 1초간 파티클 반복 생성
      const createFountainEffect = () => {
        confetti({
          origin: origin,
          particleCount: 2, // 적은 개수로 여러 번 생성
          spread: 25, // 적당한 퍼짐
          angle: 90, // 위쪽 방향
          scalar: 1.8, // 이모지 크기
          ticks: 600, // 짧은 지속시간으로 빠른 낙하
          gravity: 7.5, // 강한 중력으로 빠른 자유낙하
          decay: 0.9, // 적당한 페이드아웃
          startVelocity: 30, // 적당한 초기 속도
          flat: true, // 2D 평면 효과
          shapes: [confetti.shapeFromText({ text: emojiSymbol, scalar: 2 })],
          drift: 0, // 수직 낙하
        });
      };

      // 1초간 파티클 반복 생성 (100ms 간격으로 10번)
      createFountainEffect(); // 즉시 첫 번째 실행
      const intervals = [];
      for (let i = 1; i < 5; i++) {
        const timeoutId = setTimeout(createFountainEffect, i * 100);
        intervals.push(timeoutId);
      }    
      
      setTimeout(() => {
        onClose();
      }, 600); // 애니메이션이 시작될 수 있도록 약간의 지연을 줍니다.
    }
        
    // UI를 즉시 업데이트하기 위해 새로운 액션을 먼저 호출합니다.
    toggleMyEmoji(msgId, emojiType);
    
    setTargetEmoji(msgId, emojiType, currentCount);
    setAction(action === 'like');
    toggleEmoji();
  };

  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-md shadow-xs p-1 space-x-0">
      {emojis.map(({ symbol }) => (
        <button
          key={symbol}
          onMouseDown={() => setPressedEmoji(symbol)}
          onMouseUp={() => setPressedEmoji(null)}
          onMouseLeave={() => setPressedEmoji(null)}
          onClick={(e) => handleEmojiClick(e, symbol)}
          className={`px-2 py-1 text-sm rounded-md hover:bg-gray-200 focus:outline-none transform transition-transform duration-75 ease-in-out ${
            pressedEmoji === symbol ? 'scale-90' : 'scale-100'
          }`}
        >
          <span className="text-[15px]">{symbol}</span>
        </button>
      ))}
    </div>
  );
}


export function EmojiGroup({ msgId, userId, checkCnt, clapCnt, prayCnt, sparkleCnt, likeCnt, onClose, myToggle }: EmojiGroupProps) {
    const [pressedEmoji, setPressedEmoji] = useState<string | null>(null);
    const { toggleEmoji, setTargetEmoji, setAction, toggleMyEmoji } = useMessageStore();

    const emojiData: { symbol: string; count: number; type: EmojiType }[] = [
      { symbol: '✅', count: checkCnt, type: 'check' },
      { symbol: '🙏', count: prayCnt, type: 'pray' },
      { symbol: '✨', count: sparkleCnt, type: 'sparkle' },
      { symbol: '👏', count: clapCnt, type: 'clap' },
      { symbol: '❤️', count: likeCnt, type: 'like' },
    ];

    const handleEmojiClick = (e: React.MouseEvent<HTMLButtonElement>, emojiType: EmojiType, currentCount: number) => {
      
      const isAlreadyToggled = myToggle[emojiType];
      const action = isAlreadyToggled ? 'unlike' : 'like';
      const emojiSymbol = emojis.find(em => em.type === emojiType)?.symbol || '';

      if (!myToggle[emojiType]) {
        const rect = e.currentTarget.getBoundingClientRect();
        const origin = {
          x: (rect.left + rect.right) / 2 / window.innerWidth,
          y: (rect.top + rect.bottom) / 2 / window.innerHeight,
        };
    
        const createFountainEffect = () => confetti({
          origin: origin, 
          particleCount: 2,
          spread: 25,
          angle: 90,
          scalar: 1.8,
          ticks: 600,
          gravity: 7.5,
          decay: 0.9,
          startVelocity: 30,
          flat: true,
          shapes: [confetti.shapeFromText({ text: emojiSymbol, scalar: 2 })],
          drift: 0,
        });

        // 1초간 파티클 반복 생성 (100ms 간격으로 10번)
        createFountainEffect(); // 즉시 첫 번째 실행
        const intervals = [];
        for (let i = 1; i < 5; i++) {
          const timeoutId = setTimeout(createFountainEffect, i * 100);
          intervals.push(timeoutId);
        }       
      }
      
      // UI를 즉시 업데이트하기 위해 새로운 액션을 먼저 호출합니다.
      toggleMyEmoji(msgId, emojiType);

      setTargetEmoji(msgId, emojiType, currentCount);
      setAction(action === 'like');
      toggleEmoji();
    };

  return (
    <div className="flex flex-row flex-wrap gap-2 mt-1">
      {emojiData.map(({ symbol, count, type }) => 
        (count > 0) && ( // 4. 내가 눌렀으면 카운트가 0이어도 표시
          <button
            key={symbol}
            onMouseDown={() => setPressedEmoji(symbol)}
            onMouseUp={() => setPressedEmoji(null)}
            onMouseLeave={() => setPressedEmoji(null)}
            onClick={(e) => handleEmojiClick(e, type, count)} // 2. 올바른 타입과 카운트를 전달
            className={`flex flex-row h-[26px] min-w-[48px] items-center justify-center gap-1 border rounded-xl p-1 space-x-0 cursor-pointer ${
              pressedEmoji === symbol ? 'scale-90' : 'scale-100'
            } ${
              myToggle[type] ? 'bg-blue-500 text-white border-blue-700 hover:bg-blue-600' : 'bg-gray-200 border-gray-400 hover:bg-gray-300'
            }`}
          >
            <span className="text-[15px]">{symbol}</span>
            <span className="text-xs">{count}</span>            
          </button>
        )
      )}
    </div>
  );
}

