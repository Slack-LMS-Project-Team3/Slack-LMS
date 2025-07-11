import React from "react";

export function ShowDate(props: { timestamp: number }) {
  return (
    <div className="sticky top-1.5 mx-auto w-[120px] h-[28px] my-2 border-divider-gray flex items-center justify-center rounded-full">
      <span className="text-center text-s-bold">
        {new Date(props.timestamp).toLocaleDateString("ko-KR", {
          month: "long",
          day: "numeric",
          weekday: "long",
        })}
      </span>
    </div>
  );
}
