import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { filterUsers } from "./validation";
import { usePathname } from "next/navigation";
import { createUsers } from "@/apis/excelApi";
import { toast } from "sonner";
import { CircleCheck, Ban, FileSpreadsheet, Loader2 } from "lucide-react";
import { useUserStore } from "@/store/userStore";

export function ExUpload() {
  const workspaceId = usePathname().split("/")[2];
  const inputRef = useRef<HTMLInputElement>(null);
  const { fetchUsers } = useUserStore();

  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  // Alert 상태 관리
  const [alertInfo, setAlertInfo] = useState<{
    variant: "default" | "destructive";
    message: React.ReactNode;
  } | null>(null);

  useEffect(() => {
    if (alertInfo) {
      const timer = setTimeout(() => setAlertInfo(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  const handleClick = () => {
    if (isLoading) return; // 로딩 중일 때는 클릭 방지
    inputRef.current?.click();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/\.(xlsx|xls)$/i.test(file.name)) {
      toast.error("엑셀 파일만 업로드 가능합니다. (.xlsx, .xls)", {
        icon: <Ban className="size-5" />,
      });
      return;
    }

    setIsLoading(true); // 로딩 시작

    try {
      // excel 파일을 읽어옴
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const groupData = jsonData
        .map((row: any) => row["group"])
        .filter(
          (group) => group !== undefined && group !== null && group !== "",
        )
        .flatMap((group) => group.toString().split(",")) // 쉼표로 분리
        .map((group) => group.trim()) // 앞뒤 공백 제거
        .filter((group) => group !== ""); // 빈 문자열 제거

      const uniqueGroups = [...new Set(groupData)]; // 중복 제거

      // 형식에 맞지 않은 user를 제거
      const { users } = filterUsers(jsonData);
      const memberList = users.map((user) => ({
        email: user.email,
        name: user.name,
        // role: user.role,
        group: user.group
          ? user.group
              .toString()
              .split(",")
              .map((g: string) => g.trim())
              .filter((g: string) => g !== "")
          : [],
        blog: user.blog,
        github: user.github,
        workspace_id: workspaceId,
      }));

      const result = await createUsers(memberList, uniqueGroups, workspaceId);
      await fetchUsers(workspaceId, true);

      if (result.success_count === 0) {
        toast.error("등록에 실패했습니다", {
          icon: <Ban className="size-5" />,
        });
        return;
      }

      toast.success(`${result.success_count}명이 등록되었습니다`, {
        icon: <CircleCheck className="size-5" />,
      });
    } catch (err) {
      toast.error("등록에 실패했습니다", {
        icon: <Ban className="size-5" />,
      });
    } finally {
      setIsLoading(false); // 로딩 종료
      // 파일 input 초기화
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        className="text-gray-800"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-0 h-4 w-4 animate-spin" />
        ) : (
          <FileSpreadsheet className="mr-0 h-4 w-4" />
        )}
        {isLoading ? "Importing..." : "Import .xlsx"}
      </Button>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFile}
        ref={inputRef}
        className="hidden"
        disabled={isLoading}
      />
    </>
  );
}
