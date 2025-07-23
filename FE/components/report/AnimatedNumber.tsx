"use client"

import CountUp from 'react-countup';

interface AnimatedNumberProps {
  value: number;
}

export default function AnimatedNumber({ value }: AnimatedNumberProps) {
  return <CountUp end={value} duration={2.5} separator="," />;
}
