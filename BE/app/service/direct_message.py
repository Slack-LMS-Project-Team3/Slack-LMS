from typing import List, Dict
from uuid import UUID
from app.repository.direct_message import DMRepository
from app.service.tab import TabService

class DMService:
    def __init__(self):
        self.repo = DMRepository()
        self.tab_service = TabService()

    def get_tab(self, creator_id: str, user_ids: List[str], workspace_id: int, tab_name: str, section_id: int):
        # 멤버 구성으로 이미 생성된 방 찾기
        tabs = self.tab_service.find_tabs(workspace_id, creator_id)
        for tab_info in tabs:
            tab_id = tab_info[0]
            tmp_section_id = tab_info[2]
            members = self.tab_service.get_tab_members(workspace_id, tab_id)
            if tmp_section_id == 4 and set(member[0].hex() for member in members) == set(user_ids):
                return tab_info
        
        # 방이 없다면 생성하기    
        return self.tab_service.create_tab(user_ids, workspace_id, tab_name, section_id)

    def find_member_names(self, user_ids: List) -> Dict[str, str]:
        rows = self.repo.find_member_names(user_ids)
        # user_id (bytes)를 다시 string으로 변환하여 딕셔너리 생성
        member_map = {UUID(bytes=row[0]).hex: row[1] for row in rows}
        return member_map
    
    # dm 방에 존재하는 사람들 userid 챙겨오기.
    def find_member_id(self, user_ids: List) -> Dict[str, str]:
        rows = self.repo.find_member_user_id(user_ids)
        return rows