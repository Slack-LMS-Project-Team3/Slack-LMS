"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { getLinks, deleteLink, Link as ApiLink } from "@/apis/linkApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { CircleCheck, Ban } from "lucide-react";

// 테이블에 표시할 항목 타입
type LinkItem = ApiLink;

interface LinkTableProps {
  workspaceId: string;
  tabId: string;
  reload?: number;
}

export default function LinkTable({
  workspaceId,
  tabId,
  reload = 0,
}: LinkTableProps) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null);

  useEffect(() => {
    if (!workspaceId || !tabId) return;

    const fetchLinks = async () => {
      try {
        setLoading(true);
        const data = await getLinks(workspaceId, tabId);
        setLinks(data);
      } catch (err: any) {
        setError(err.message || "링크 조회에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [workspaceId, tabId, reload]);

  // 다이얼로그 오픈 시 선택된 링크 저장
  const handleDeleteClick = (linkId: number) => {
    setSelectedLinkId(linkId); // void 반환
    setIsDialogOpen(true);
  };

  // 다이얼로그 확인 클릭: 실제 삭제
  const handleConfirmDelete = async () => {
    console.log(selectedLinkId);

    if (selectedLinkId === null) return;

    try {
      await deleteLink(workspaceId, tabId, selectedLinkId.toString());
      setLinks((prev) => prev.filter((l) => l.link_id !== selectedLinkId));

      toast.success("링크가 삭제되었습니다", {
        icon: <CircleCheck className="size-5" />,
      });
    } catch (e) {
      toast.error(`실패, ${e}`, {
        icon: <Ban className="size-5" />,
      });
    } finally {
      setIsDialogOpen(false);
      setSelectedLinkId(null);
    }
  };

  const columns = useMemo<ColumnDef<LinkItem>[]>(
    () => [
      {
        accessorKey: "link_name",
        header: "Link",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-5">
              <img
                src={item.link_favicon ? item.link_favicon : "/linkDefault.png"}
                alt="favicon"
                className="h-8 w-8 rounded-sm"
              />
              <div className="flex flex-col">
                <a
                  href={item.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-m-bold hover:underline"
                >
                  {item.link_name}
                </a>
                <span className="text-sm text-gray-500">
                  {item.link_url.length > 70
                    ? `${item.link_url.slice(0, 70)}...`
                    : item.link_url}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="p-0 text-gray-500">
                <span className="sr-only">Actions</span>
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleDeleteClick(row.original.link_id)}
              >
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [handleDeleteClick],
  );

  const table = useReactTable<LinkItem>({
    data: links,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <div className="p-4 text-center">링크 불러오는 중</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      {/* 삭제 메시지 확인 다이얼로그 */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>링크 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              선택한 링크를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex rounded-xl w-full border bg-background">
        <Table>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="h-16">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`p-4 ${cell.column.id === "actions" ? "text-right" : ""}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-20 text-center"
                  colSpan={columns.length}
                >
                  링크가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
