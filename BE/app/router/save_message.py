from typing import List

from fastapi import APIRouter, Depends, Query

from app.schema.save_message.request import SaveMessageCreate
from app.schema.save_message.response import SaveMessageSchema
from app.service.save_message import SaveMessageService
from app.util.auth import get_current_user

router = APIRouter()
service = SaveMessageService()


@router.post("/save-messages", status_code=201, response_model=SaveMessageSchema)
async def save_message(req: SaveMessageCreate, current_user=Depends(get_current_user)):
    message = await service.save(current_user["user_id"], req.workspace_id, req.content)
    return SaveMessageSchema.from_domain(message)


@router.get("/save-messages", response_model=List[SaveMessageSchema])
async def get_saved_messages(workspace_id: int = Query(...), current_user=Depends(get_current_user)):
    messages = await service.get_all(current_user["user_id"], workspace_id)
    return [SaveMessageSchema.from_domain(m) for m in messages]


@router.delete("/save-messages/{message_id}")
async def delete_saved_message(message_id: int, current_user=Depends(get_current_user)):
    await service.delete(message_id, current_user["user_id"])
    return {"success": True}