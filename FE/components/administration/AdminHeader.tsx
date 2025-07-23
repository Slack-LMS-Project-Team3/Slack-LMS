"use client"

import { SquareUserRound, KeyRound, UsersRound } from "lucide-react"
import { usePathname, useParams, useRouter } from "next/navigation"

export function AdminHeader() { 
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  
  // 현재 활성화된 탭 확인
  const isActive = (tab: string) => {
    return pathname.includes(tab);
  };
  
  // 탭 클릭 핸들러
  const handleTabClick = (tab: string) => {
    router.push(`/workspaces/${workspaceId}/admin/${tab}`);
  };

  return (    
      <div className="sticky top-0 bg-white shadow-sm">        
        <div className="flex items-center h-[50px] px-[17px]">
            <div className="flex flex-1 justify-between items-center h-[30px] px-[3px]">
                <div className="flex items-center">                
                    <p className="text-l">Administration</p>
                </div>
            </div>
        </div>
        <div className="flex items-center h-[38px] px-[12px] border-b-1 gap-0">
          <div 
            className={`flex flex-fit items-center p-[6px] px-[10px] cursor-pointer ${isActive('users') ? 'bg-gray-600 text-white rounded-t-md' : 'hover:bg-gray-200 hover:text-gray-800 hover:rounded-t-md'}`}
            onClick={() => handleTabClick('users')}
          >           
            <SquareUserRound className="w-[16px] mr-[4px]" />
            <p className="text-center text-s-bold">Members</p>
          </div>
          <div 
            className={`flex flex-fit items-center p-[6px] px-[10px] cursor-pointer ${isActive('groups') ? 'bg-gray-600 text-white rounded-t-md' : 'hover:bg-gray-200 hover:text-gray-800 hover:rounded-t-md'}`}
            onClick={() => handleTabClick('groups')}
          >
            <UsersRound className="w-[16px] mr-[4px]" />
            <p className="text-center text-s-bold">Groups</p>
          </div>
          <div 
            className={`flex flex-fit items-center p-[6px] px-[10px] cursor-pointer ${isActive('roles') ? 'bg-gray-600 text-white rounded-t-md' : 'hover:bg-gray-200 hover:text-gray-800 hover:rounded-t-md'}`}
            onClick={() => handleTabClick('roles')}
          >
            <KeyRound className="w-[16px] mr-[4px]" />
            <p className="text-center text-s-bold">Roles</p>
          </div>
        </div>
      </div>
  );
}
