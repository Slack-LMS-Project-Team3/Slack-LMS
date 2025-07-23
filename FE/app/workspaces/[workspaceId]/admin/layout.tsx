"use client";

import { AdminHeader } from "@/components/administration/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 w-full h-full flex-col gap-0 overflow-hidden">
      {/* 헤더 */}
      <div>
        <AdminHeader />
      </div>
      <div className="flex flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin p-5">
        {children}
      </div>
    </div>
  );
}
