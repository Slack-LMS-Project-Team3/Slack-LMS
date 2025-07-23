from uuid import UUID, uuid4
from typing import List

from app.service.users import UserService
from app.service.group import GroupsService

from app.service.role import RoleService
from app.service.tab import TabService

from app.repository.role import QueryRepo as RolesRepository
from app.repository.member_role import MemberRoleRepository # 명훈 추가

from app.domain.workspace_member import WorkspaceMember
from app.repository.workspace_member import QueryRepo as WorkspaceMemberRepo
from app.schema.workspace_members.request import UpdateWorkspaceMemberRequest
from app.schema.workspace_members.response import (
    WorkspaceMemberResponse,
    WorkspaceMemberSchema,
)

tab_service = TabService()
role_repo = RolesRepository() # 명훈 추가
user_service = UserService()
group_service = GroupsService()
role_service = RoleService()

class WorkspaceMemberService:
    def __init__(self):
        self.workspace_member_repo = WorkspaceMemberRepo()

    def import_users(self, workspace_id, data: dict) -> dict:

        if data["users"] == []:
            return {
                "success_count": 0
            }
        
        # 사용자 생성
        user_service.create_users_bulk(data, workspace_id)

        # 워크스페이스 멤버 생성
        self.insert_workspace_member(data, workspace_id)

        # 그룹 생성 및 멤버 추가
        insert_groups = group_service.make_group(data["groups"], workspace_id)
        group_service.insert_group_member(data, insert_groups)

        # 역할 생성
        created_roles = role_service.insert_member_roles_bulk(data)

        return {
        "success_count": created_roles
    }

    def insert_workspace_member(self, data: dict, workspace_id: int):
        workspace_member_list = []
        for workspace_member_data in data["users"]:
            workspace_member_list.append({
                "nickname": workspace_member_data["name"],
                "email": workspace_member_data["email"],
                "workspace_id": workspace_id,
                "id": uuid4().bytes,
                "blog": workspace_member_data["blog"],
                "github": workspace_member_data["github"],
            })
        workspace_member = self.workspace_member_repo.bulk_insert_workspace_member(workspace_member_list)
        return workspace_member

    def get_member_by_user_id_simple(self, id: UUID | bytes, workspace_id: int):
        user_id_bytes = id.bytes if isinstance(id, UUID) else id  
        workspace_member = self.workspace_member_repo.find_by_user_id_simple(user_id_bytes, workspace_id)
        return workspace_member    

    def get_member_by_user_id(self, id: UUID | bytes) -> WorkspaceMember:
        user_id_bytes = id.bytes if isinstance(id, UUID) else id  
        workspace_member = self.workspace_member_repo.find_by_user_id(user_id_bytes)
        return workspace_member

    def get_member_by_email(self, email: str) -> WorkspaceMember:
        workspace_member = self.workspace_member_repo.find_by_email(email)
        return workspace_member
    
    def get_member_by_nickname(self, nickname: str) -> WorkspaceMember:
        workspace_member = self.workspace_member_repo.find_by_nickname(nickname)
        return workspace_member

    def get_member_by_workspace_columns(self) -> list[str]:
        workspace_columns = self.workspace_member_repo.find_by_workspace_columns()
        return workspace_columns
  
    def get_member_by_workspace_id(self, workspace_id: int) -> List[list]:
        members_infos = self.workspace_member_repo.find_by_user_workspace_id(workspace_id)
        return members_infos

    def update_profile_by_user_id(self, workspace_id: int, user_id: UUID, payload: UpdateWorkspaceMemberRequest) -> WorkspaceMemberResponse:
        user_id_bytes = user_id.bytes  # BINARY(16)에 맞게 변환

        # user_id로 찾은 모든 dm 방에서 user_id에 대한 이름 변경
        tab_infos = tab_service.find_tabs(workspace_id, str(user_id))
        for tab_info in tab_infos:
            section_id = tab_info[2]
            if section_id == 4: # dm에 인원 초대 시 tab_name 변경
                tab_id = tab_info[0]
                tab_name = tab_info[1].split(", ") 
                user_name = self.get_member_by_user_id(user_id_bytes)[0][2]
                tab_name.remove(user_name) # 변경 전 이름 삭제
                tab_name.append(payload.nickname) # 변경된 이름 추가
                tab_name = ", ".join(tab_name)
                tab_service.modify_name(workspace_id, tab_id, tab_name)

        # 업데이트 쿼리는 영향받은 행 수만 반환하므로, 업데이트 후 다시 조회하여 데이터 반환
        self.workspace_member_repo.update(workspace_id, user_id_bytes, payload)
        updated_rows = self.workspace_member_repo.find_by_user_id(user_id_bytes)
        updated_member = WorkspaceMemberSchema.from_row(updated_rows[0])

        return WorkspaceMemberResponse(workspace_member=updated_member)
    
    # 미완
    def edit_member_role(self, workspace_id: int, user_id: str) -> bool:
        # 일단 전해받은 유저 아이디, 롤 아이디, 워크스페이스 아이디.
        # 이걸로 member_roles 테이블 접근해서 role 아이디 바꿔주면 되겠네.
        # -> 만약 전해받은 role아이디가 현재 role_id와 같다면? = false
        # -> 성공적으로 변경되었을 경우만 true?

        return 
    
    async def delete_member(self, workspace_id: int, user_id: str) -> bool:
        tabs_data = tab_service.find_tabs(workspace_id, user_id)
        for tab_data in tabs_data:
            print("in delete_member, tab_id: ", tab_data[0])
            await tab_service.exit_tab(workspace_id, tab_data[0], [user_id])
        rows = self.workspace_member_repo.find_by_user_id(UUID(user_id).bytes)
        for row in rows:
            if workspace_id==row[1] :
                self.workspace_member_repo.delete_wm_by_id(row[9])
        res_mem_roles = role_service.delete_member_roles(user_id, workspace_id)
        res_grp_mem = group_service.delete_grp_mem_by_ws_id(user_id, workspace_id)
        return res_grp_mem and res_mem_roles
    
    
    def search_members(self, workspace_id: int, keyword: str) -> List[tuple]:
        rows = self.workspace_member_repo.search_members(workspace_id, keyword)
        return rows
    # 회원 등록(개별) - 미완
    def register_single(self, workspace_id, data: dict) -> dict:
        user_name = data["nickname"]
        email = data["email"]
        role_id = int(data["role_id"])
        group_id = data["group_id"]

        # users에 없으면 추가, 있으면 패스
        res_users = user_service.find_user_by_email(email)
        try:
            user_id = res_users[0][0]
        except:
            if (not res_users):
                # id, name, email, provider, workspace_id
                params = {
                    "id": uuid4().bytes,
                    "name": user_name,
                    "email": email,
                    "provider": "google",
                    "workspace_id": workspace_id
                }
                user_service.create_user_in_usertable(params)
                user_id = user_service.find_user_by_email(email)
        
        # workspace_members에 없으면 추가, 있으면 패스
        res_wm = self.get_member_by_user_id(user_id)
        if (not res_wm):
            # id, name, email, provider, workspace_id
            params = {
                "id": uuid4().bytes,
                "user_id": user_id,
                "email": email,
                "nickname": user_name,
                "workspace_id": workspace_id
            }
            self.insert_workspace_member(params)

        # workspace의 기본 탭, tab_members에 추가.(tab_id = 1)

        # group_members 추가
        params = {
            "user_id": user_id,
            "group_id": data["group_id"],
            "user_name": user_name
        }
        group_service.insert_member_by_group_id()
        # member_roles 추가
        params = {
            "user_id": user_id,
            "user_name": user_name,
            "role_id": role_id
        }
        role_service.insert_member_roles(params)

        return 

    def get_user_workspaces(self, user_id: str, workspace_id: str) -> List[WorkspaceMember]:
        print("get_user_workspaces user_id", user_id)
        workspaces = self.workspace_member_repo.find_by_user_all_workspace_id(user_id, workspace_id)
        print("get_user_workspaces workspaces", workspaces)
        return workspaces