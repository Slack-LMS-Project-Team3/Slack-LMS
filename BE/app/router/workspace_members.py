from fastapi import APIRouter, Depends, HTTPException, status
from app.schema.workspace_members.request import UpdateWorkspaceMemberRequest
from app.schema.workspace_members.response import WorkspaceMemberSchema, WorkspaceMemberResponse
from app.service.workspace_member import WorkspaceMemberService
from uuid import UUID


router = APIRouter(prefix="/workspaces")
service = WorkspaceMemberService()

@router.get("/{workspace_id}/members/{user_id}/profile", response_model=WorkspaceMemberSchema)
def get_profile(workspace_id: int, user_id: str):
    uuid_obj = UUID(user_id)
    rows = service.get_member_by_user_id(uuid_obj)
    return WorkspaceMemberSchema.from_row(rows[0])

@router.patch("/{workspace_id}/members/{user_id}/profile", response_model=WorkspaceMemberSchema)
def update_profile(workspace_id: int, user_id: str, payload: UpdateWorkspaceMemberRequest):
    uuid_obj = UUID(user_id)
    response = service.update_profile_by_user_id(workspace_id, uuid_obj, payload)
    return response.workspace_member

#검색  
@router.get("/{workspace_id}/members/search", response_model=list[WorkspaceMemberSchema])
def search_members(workspace_id: int, q: str):
    rows = service.search_members(workspace_id, q)
    return [WorkspaceMemberSchema.from_row(row) for row in rows]