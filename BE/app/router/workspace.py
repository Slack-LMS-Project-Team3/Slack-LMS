import uuid
from fastapi import APIRouter, Depends, Request

from app.core.security import verify_token_and_get_token_data
from app.repository.sub_tabs import QueryRepo as SubTabRepo
from app.repository.workspace_member import QueryRepo as WorkspaceMemRepo

from app.repository.role import QueryRepo as RoleRepository
from app.repository.member_role import MemberRoleRepository
from app.repository.tab import TabRepository

from app.service.users import UserService
from app.service.workspace import WorkspaceService
from app.service.workspace_member import WorkspaceMemberService

from app.schema.workspace.response import WorkspaceNameSchema
from app.schema.workspace.response import WorkspaceMembersSchema
from app.schema.workspace.response import InsertWorkspaceSchema

router = APIRouter(prefix="/workspaces")

workspace_service = WorkspaceService()
workspace_mem_repo = WorkspaceMemRepo()
tab_repo = TabRepository()
sub_tab_repo = SubTabRepo()
workspace_member_service = WorkspaceMemberService()
roles_repo = RoleRepository()
member_roles_repo = MemberRoleRepository()
user_service = UserService()

@router.get("/{workspace_id}")
async def get_workspace_tab(workspace_id: str,
                            token_user_id_and_email = Depends(verify_token_and_get_token_data),
                            ) -> list:

    tab_member_datas = tab_repo.find_by_user_id(uuid.UUID(token_user_id_and_email["user_id"]).bytes)

    result = []
    for data in tab_member_datas:
        tab_data = tab_repo.find_tabs_by_id(data["tab_id"])
        sub_tab_data = sub_tab_repo.find_sub_tabs_by_tab_id(data["tab_id"])

        result.append({
            "id": data["tab_id"],
            "name": tab_data["name"],
            "section_id": tab_data["section_id"],
            "sub_tab_data":{
                "name":sub_tab_data["name"],
            }
        })

    return result

# 워크스페이스 정보 조회
@router.get("/{workspace_id}/title", response_model=WorkspaceNameSchema)
def get_workspace_info(workspace_id: int):
    row = workspace_service.get_workspace_info(workspace_id)
    return WorkspaceNameSchema.from_row(row)

# 사용자가 참여한 워크스페이스 목록 조회
@router.post("/user/workspaces")
async def get_user_workspaces(
    request: Request
):
    # 사용자가 참여한 워크스페이스 목록 조회
    data: dict = await request.json()
    user_id = data["user_id"]
    workspace_id = data["workspace_id"]
    workspaces = workspace_member_service.get_user_workspaces(user_id, workspace_id)
    return workspaces

# 회원 등록(파일 임포트)
@router.post("/{workspace_id}/users", response_model=InsertWorkspaceSchema)
async def register_members(request: Request, workspace_id: int):
    datas: dict = await request.json()
    res = workspace_member_service.import_users(workspace_id, datas)
    return InsertWorkspaceSchema.from_dict(res) 

# 프로필 필드 조회
@router.get("/{workspace_id}/userinfo")
async def get_user_columns(request: Request):
    columns = workspace_member_service.get_member_by_workspace_columns()
    return columns

# 회원 리스트 조회
@router.get("/{workspace_id}/users", response_model=list)
async def get_members(workspace_id: int, token_user_id_and_email = Depends(verify_token_and_get_token_data)):
    rows = workspace_member_service.get_member_by_workspace_id(workspace_id)
    res = WorkspaceMembersSchema.from_row(rows)
    return res.mem_infos

# 회원 등록(개별) - 미완 -> 수정해야됨.
@router.post("/{workspace_id}/users/single")
async def register_member(workspace_id: int, request: Request):#, token_user_id_and_email = Depends(verify_token_and_get_token_data)):
    data: dict = await request.json()
    print("in register_member, user: ", data)
    res = workspace_member_service.register_single(workspace_id, data)
    # print("in register_member, res: ", res)
    return #InsertWorkspaceSchema.from_dict(res)

# 회원 역할 수정(개별) - 미완. ("nickname: string, email: string, role_id: string, group_id: string[ ]")
@router.patch("/{workspace_id}/users/{user_id}/role", response_model=bool)
async def edit_member_role(workspace_id: int, user_id: str, request: Request):#, token_user_id_and_email = Depends(verify_token_and_get_token_data)):
    data: dict = await request.json()
    print("in edit_member_role, user: ", data)
    res = workspace_member_service.edit_member_role(workspace_id, user_id, data["role_id"])
    print("in edit_member_role, res: ", res)
    return res

# 회원 삭제(개별) - 추가 작업 : 워크스페이스에서 방출했으면, 워크스페이스로 진입하지 못하게.
@router.patch("/{workspace_id}/users/{user_id}/delete", response_model=bool)
async def delete_member(workspace_id: int, user_id: str):#, token_user_id_and_email = Depends(verify_token_and_get_token_data)):
    res = await workspace_member_service.delete_member(workspace_id, user_id)
    print("in delete_member, res: ", res)
    return res