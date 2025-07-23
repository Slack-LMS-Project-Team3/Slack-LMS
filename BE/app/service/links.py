from uuid import UUID, uuid4
from typing import List
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

from app.repository.links import QueryRepo as LinkRepo
from app.schema.links.response import (
    LinkSchema,
)
link_repo = LinkRepo()

class LinkService:
    def __init__(self):
        self.link_repo = link_repo

    # 링크 리스트 조회
    def find_all_list_at_tab(self, workspace_id: int, tab_id: int) -> List[LinkSchema]:
        rows = self.link_repo.find_all_list_at_tab(workspace_id, tab_id)
        res = [LinkSchema.from_row(row) for row in rows]
        print("find_all_list_at_tab, res: ", res)
        return res

    def get_favicon_url(self, page_url: str) -> str:
        try:
            res = requests.get(page_url, headers={
                "User-Agent": "Mozilla/5.0"
            }, timeout=3)
            soup = BeautifulSoup(res.text, 'html.parser')

            # 1. <link rel="icon" ...> 찾기
            icon_link = soup.find("link", rel=lambda x: x and "icon" in x.lower())
            if icon_link and icon_link.get("href"):
                return urljoin(page_url, icon_link["href"])

            # 2. 기본 favicon 경로 시도
            parsed = urlparse(page_url)
            return f"{parsed.scheme}://{parsed.netloc}/favicon.ico"
        except Exception as e:
            print(f"Favicon fetch 실패: {e}")
            return None

    # 링크 추가
    def insert_link(self, workspace_id: int, tab_id: int, link_url: str, link_name: str, user_id: str):
        favicon = self.get_favicon_url(link_url)
        return self.link_repo.insert_link(workspace_id, tab_id, link_url, link_name, favicon, user_id)

    # 링크 삭제
    def delete_link(self, workspace_id: int, tab_id: int, link_id: str):
        return self.link_repo.delete_link(workspace_id, tab_id, link_id)

