from fastapi import APIRouter, Request
from typing import List

from app.service.role import RoleService
from app.schema.role.request import CreateRoleRequest, ModifyRoleRequest, DeleteRoleRequest
from app.schema.role.response import RoleResponse

from uuid import UUID

router = APIRouter(prefix="/workspaces")
role_service = RoleService()

# 역할별 권한 조회
@router.get("/{workspace_id}/users/{user_id}/permissions", response_model=RoleResponse)
async def get_role(workspace_id: int, user_id: str):
    role = role_service.find(workspace_id, UUID(user_id).bytes)
    return RoleResponse.from_domain(role)

# 전체 역할 리스트 조회
@router.get("/{workspace_id}/roles", response_model=List[RoleResponse])
async def get_roles(workspace_id: int):
    roles = role_service.find_all(workspace_id)
    print("\n\nget_roles, roles: ", roles)
    return [RoleResponse.from_domain(role) for role in roles]

# 역할별 권한 생성
@router.post("/{workspace_id}/roles", response_model=bool)
async def create_role(workspace_id: int, dto: CreateRoleRequest):
    role = role_service.create(workspace_id, dto.role_name, dto.permissions)
    print("create_role: ", role.name, dto.role_name)
    return role.name == dto.role_name
    # return RoleResponse.from_domain(role)

# 역할별 권한 삭제
@router.patch("/{workspace_id}/roles/{role_id}/delete")
async def delete_role(workspace_id: int, role_id: int):
    res = role_service.delete(workspace_id, role_id)
    if res["rowcount"] == 1:
        return True
    return False
    # return {"message": "역할이 성공적으로 삭제되었습니다"}

# 역할별 권한 수정
@router.patch("/{workspace_id}/roles/{role_id}/edit", response_model=bool)
async def modify_role(workspace_id: int, role_id: int, dto: ModifyRoleRequest):
    role = role_service.modify(workspace_id, role_id, dto.role_name, dto.permissions)
    return role.name == dto.role_name
    # return RoleResponse.from_domain(role)