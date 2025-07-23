from fastapi import APIRouter, Depends, Query, Request
from typing import List, Dict
from app.schema.tab.request import CreateTabRequest, InviteRequest
from app.schema.tab.response import TabInfo, TabDetailInfo, TabMember, TabInvitation, CreateTabResponse, TabGroupMember
from app.service.links import LinkService
from app.core.security import verify_token_and_get_token_data
from app.repository.workspace_member import QueryRepo as WorkspaceMemRepo
from app.router.sse import send_sse_notification
import asyncio

router = APIRouter(prefix="/workspaces")
service = LinkService()

# 링크 리스트 조회
@router.get("/{workspace_id}/tabs/{tab_id}/links")
def get_all_list_at_tab(workspace_id: int, tab_id: int):
    return service.find_all_list_at_tab(workspace_id, tab_id)

# 링크 추가
@router.post("/{workspace_id}/tabs/{tab_id}/links", response_model=bool)
async def insert_link_in_tab(workspace_id: int, tab_id: int, request: Request, user_info: dict = Depends(verify_token_and_get_token_data)):
    data = await request.json()
    print("insert_link_in_tab, data: ", data)
    user_id = user_info["user_id"]
    link_url = data["link_url"]
    link_name = data["link_name"]
    return service.insert_link(workspace_id, tab_id, link_url, link_name, user_id)

# 링크 삭제
@router.patch("/{workspace_id}/tabs/{tab_id}/links", response_model=bool)
async def delete_link_in_tab(workspace_id: int, tab_id: int, request: Request):#, user_info: dict = Depends(verify_token_and_get_token_data)):
    data = await request.json()
    print("insert_link_in_tab, data: ", data)
    link_id = data["link_id"]
    return service.delete_link(workspace_id, tab_id, link_id)