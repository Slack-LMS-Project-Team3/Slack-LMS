from fastapi import APIRouter, HTTPException
import os

router = APIRouter()

@router.get("/workspaces/{workspace_id}/tabs/{tab_id}/canvases/{page_id}")
async def get_notion_page(workspace_id: int, tab_id: int, page_id: str):
    try:
        # splitbee.io API를 통해 노션 페이지 데이터 가져오기
        import httpx
        
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://notion-api.splitbee.io/v1/page/{page_id}")
            print(response)
            
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="Failed to fetch notion page")
            
            return response.json()
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
