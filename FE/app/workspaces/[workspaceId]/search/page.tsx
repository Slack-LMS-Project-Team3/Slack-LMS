"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchUsers } from "@/apis/userApi";
import { Profile } from "@/apis/profileApi";

export default function WorkspaceSearchPage() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const [users, setUsers] = useState<Profile[]>([]);

  useEffect(() => {
    if (!keyword) return;
    searchUsers(workspaceId, keyword).then((res) => setUsers(res));
  }, [keyword, workspaceId]);

  return (
    <div className="p-4 text-black">
      <h1 className="text-xl font-bold mb-4">Search Results</h1>
      {keyword ? (
        <ul className="space-y-2">
          {users.map((u) => (
            <li key={u.user_id} className="flex items-center gap-2">
              <img
                src={u.image || "/user_default.png"}
                className="w-12 h-12 rounded-md bg-gray-400 object-cover"
              />
              <span>{u.nickname}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No keyword provided.</p>
      )}
    </div>
  );
}