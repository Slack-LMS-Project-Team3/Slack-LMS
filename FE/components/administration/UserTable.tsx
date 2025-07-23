"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { useUserStore } from "@/store/userStore";
import { Profile } from "@/apis/profileApi";
import { userColumns as defaultUserColumns } from "../../app/workspaces/[workspaceId]/admin/users/columns";

interface UserTableProps {
  onUsersLoaded?: (count: number) => void;
  columns?: ColumnDef<Profile>[];
}

export function UserTable({ onUsersLoaded, columns }: UserTableProps = {}) {
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  // userStore에서 상태와 함수 가져오기
  const { users, fetchUsers } = useUserStore();
  
  // 로컬 상태 - 로딩 상태만 관리
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 목록 불러오기 함수
  const loadUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetchUsers(workspaceId);
      setIsLoading(false);
    } catch (error) {      
      setIsLoading(false);
    }
  }, [fetchUsers, workspaceId]);

  // 컴포넌트 마운트 시 사용자 목록 불러오기
  useEffect(() => {     
    loadUsers().finally(() => {
      // 사용자 목록 로드 완료 시 콜백 호출
    if (users?.[workspaceId] && onUsersLoaded) {
      onUsersLoaded(users[workspaceId].length);
    }
    });
  }, [workspaceId, users]);

  // 전역 상태에서 현재 워크스페이스의 사용자 데이터 가져오기
  const data = users?.[workspaceId] || [];

  const table = useReactTable({
    data,
    columns: columns || defaultUserColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 mt-30 items-start justify-center h-screen">
        <p>로딩중...</p>
      </div>
    );
  }

  // 테이블 레이아웃 계산을 위한 스타일 설정
  const columnSizes: Record<string, string> = {};
  
  // 모든 컬럼의 size 합계 계산
  const totalSize = table.getHeaderGroups()[0].headers.reduce(
    (sum, header) => sum + (header.column.columnDef.size || 0), 0
  );
  
  // 각 컬럼의 상대적 비율 계산
  table.getHeaderGroups()[0].headers.forEach((header) => {
    // 컬럼 정의에서 직접 size 값을 가져와서 비율 계산
    const size = header.column.columnDef.size || 0;
    columnSizes[header.id] = `${(size / totalSize) * 100}%`;
  });

  return (
    <div className="flex flex-1 flex-col min-h-0 w-full overflow-x-auto overflow-y-auto scrollbar-thin rounded-md border">      
      {/* 테이블 헤더와 본문을 하나의 테이블로 구성 */}
      <div className="w-full">
        <table className="w-full border-collapse" style={{ tableLayout: 'fixed', minWidth: '1000px' }}>
          <thead className="bg-gray-50 sticky top-0 shadow-xs">
            <tr>
              {table.getHeaderGroups()[0].headers.map((header) => (
                <th
                  key={header.id}
                  className="h-12 px-4 text-left align-middle text-sm font-semibold text-gray-700 border-b"
                  style={{ width: columnSizes[header.id] }}
                >
                  <div
                    className="flex items-center justify-start truncate"
                    title={header.column.columnDef.header?.toString()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-3 align-middle border-b border-gray-100 text-sm"
                      style={{ width: columnSizes[cell.column.id] }}
                    >
                      <div className="flex items-center justify-start w-full overflow-hidden">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={(columns || defaultUserColumns).length} className="h-24 text-center">
                  회원이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
