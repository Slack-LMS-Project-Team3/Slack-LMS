from fastapi import APIRouter, HTTPException
from app.service.canvas import CanvasService

router = APIRouter()
service = CanvasService()

@router.get("/workspaces/{workspace_id}/tabs/{tab_id}/canvases")
async def get_notion_page(workspace_id: int, tab_id: int):
    try:
        page_id = service.get_page_id(workspace_id, tab_id)
        if not page_id: 
            raise HTTPException(status_code=404, detail="노션 페이지 id를 등록해주세요")
        
        # splitbee.io API를 통해 노션 페이지 데이터 가져오기
        import httpx
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://notion-api.splitbee.io/v1/page/{page_id}")

            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="Failed to fetch notion page")
            
            return response.json()
        
    except HTTPException:
        # HTTPException은 그대로 re-raise (404 등 유지)
        raise
    except Exception as e:
        # 다른 예외만 500으로 처리
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/workspaces/{workspace_id}/tabs/{tab_id}/canvases/{page_id}")
async def save_notion_page(workspace_id, tab_id, page_id):
    try:
        service.save_page_id(workspace_id, tab_id, page_id)
        return {"message": "Canvas saved successfully", "page_id": page_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))