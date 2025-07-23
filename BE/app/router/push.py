from fastapi import APIRouter
from pydantic import BaseModel
from app.service.push import PushService

router = APIRouter(prefix="/push", tags=["Push"])
push_service = PushService()

class SubscribeRequest(BaseModel):
    user_id: str
    subscription: dict

# @router.post("/subscribe")
# async def subscribe(request: SubscribeRequest):
#     push_service.add_subscription(request.user_id, request.subscription)

#     return {"status": "subscribed"}

@router.post("/subscribe")
async def subscribe(request: SubscribeRequest):
    try:
        push_service.add_subscription(request.user_id, request.subscription)
        print("add_subscription 호출 성공")
    except Exception as e:
        print("add_subscription 에러:", e)

    return {"status": "subscribed"}
