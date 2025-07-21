"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { Search, AtSign, User, MessageSquare, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { searchUsers } from "@/apis/userApi";
import { Profile } from "@/apis/profileApi";
import { useCreateDM } from "@/hooks/createDM";
import { useProfileStore } from "@/store/profileStore";
import { ChevronsUpDown } from "lucide-react";

type SearchMode = "user" | "tab";

export default function SearchAutocomplete() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Profile[]>([]);
  const [searchMode, setSearchMode] = useState<SearchMode>("user");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const tabId = params.tabId as string;

  // DM 생성
  const createDM = useCreateDM();
  const openProfile = useProfileStore((s) => s.openWithId);

  useEffect(() => {
    if (!keyword || searchMode === "tab") {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      searchUsers(workspaceId, keyword).then((res) => setResults(res));
    }, 300);
    return () => clearTimeout(timer);
  }, [keyword, workspaceId, searchMode]);

  const handleSearch = () => {
    if (!keyword.trim()) return;

    if (searchMode === "user") {
      router.push(
        `/workspaces/${workspaceId}/search?q=${encodeURIComponent(keyword)}`,
      );
    } else {
      // 탭 내 검색
      if (tabId) {
        router.push(
          `/workspaces/${workspaceId}/tabs/${tabId}/search?q=${encodeURIComponent(keyword)}`,
        );
      }
    }

    setKeyword("");
    setResults([]);
  };

  const getPlaceholderText = () => {
    return searchMode === "user" ? "Search users" : "Search messages";
  };

  const handleModeSelect = (mode: SearchMode) => {
    setSearchMode(mode);
    setIsPopoverOpen(false);
    setKeyword("");
    setResults([]);
  };

  return (
    <div className="relative flex items-center w-full">
      {/* 검색 모드 셀렉터 (사용자 찾기 / 메시지 찾기) */}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex-none px-3 text-white justify-between bg-gray-700 rounded-r-none hover:bg-gray-600"
          >
            {searchMode === "user" ? (
              <div className="inline-flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>User</span>
              </div>
            ) : (
              <div className="inline-flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Message</span>
              </div>
            )}
            <ChevronsUpDown className="h-3 w-3 ml-[-3px]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32 py-[2px] text-white" align="start">
          <div>
            <Button
              className="w-full justify-start text-sm bg-gray-700"
              onClick={() => handleModeSelect("user")}
            >
              <User className="size-4" />
              User
            </Button>
            <hr className="border-gray-500" />
            <Button
              className="w-full justify-start text-sm bg-gray-700"
              onClick={() => handleModeSelect("tab")}
              disabled={!tabId}
            >
              <MessageSquare className="size-4" />
              Message
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* 검색창 */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <Input
          type="text"
          placeholder={getPlaceholderText()}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="pl-7 w-full bg-gray-700 text-white border-gray-600 rounded-l-none"
        />
      </div>

      {/* User Search Results */}
      {searchMode === "user" && results.length > 0 && (
        <ul className="absolute z-10 mt-1 top-full left-32 right-0 max-h-60 overflow-y-auto bg-white border rounded-md shadow">
          {results.map((u) => (
            <li
              key={u.user_id}
              className="flex justify-between items-center px-2 py-1 hover:bg-gray-100"
            >
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => openProfile(u.user_id)}
              >
                <img
                  src={u.image || "/user_default.png"}
                  className="w-8 h-8 rounded-md bg-gray-400 object-cover mr-1"
                />
                <span className="text-m-bold text-black">{u.nickname}</span>
              </div>
              <Button
                onClick={() => createDM(u.user_id)}
                variant="ghost"
                size="icon"
                className="w-6 h-6 cursor-pointer"
              >
                <AtSign className="size-4 text-gray-500" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
