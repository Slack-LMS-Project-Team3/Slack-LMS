from typing import List

from app.domain.message import Message, Emoji
from app.repository.message import QueryRepo as MessageRepo
from app.repository.workspace_member import QueryRepo as WorkspaceMemberRepo
from app.repository.files import QueryRepo as FilesRepo
from typing import Optional
import uuid

class MessageService:
    def __init__(self):
        self.message_repo = MessageRepo()
        self.files_repo = FilesRepo()
    
    async def save_message(self, tab_id: int, sender_id: uuid.UUID, content: str, file_data: Optional[str]) -> None:
        message = Message.of(tab_id, sender_id, content, file_data)
        res = self.message_repo.insert(message)
        return res["lastrowid"]
    
    async def toggle_like(self, tab_id: int, msg_id: int, user_id: uuid.UUID, type: str, plus: bool) -> None:
        emoji = Emoji.of(tab_id, user_id, msg_id, type)
        if (plus):
            self.message_repo.plus_emoji(emoji)
        else:
            self.message_repo.minus_emoji(emoji)
        return self.message_repo.update_emoji_cnt(emoji)        


    async def find_recent_messages(self, tab_id: int, before_id: int, user_id: str) -> List[Message]:
        return self.message_repo.find_recent_30(tab_id, before_id, user_id)

    async def find_message_by_(self, tab_id: int) -> List[Message]:
        return self.message_repo.find_all(tab_id)

    async def find_all_messages(self, tab_id: int) -> List[Message]:
        return self.message_repo.find_all(tab_id)

    async def modify_message(self, message_id: int, new_content: str, current_user_id: str):
        # row = self.message_repo.find_by_id(message_id)[0]
        # message = Message.from_row(row)
        # message.modify(new_content)
        affected_rows = self.message_repo.update_message_content(message_id, new_content, current_user_id)
        
        if affected_rows == 0:
            raise ValueError(f"메시지 ID {message_id}를 찾을 수 없습니다")
        return affected_rows

    async def delete_message(self, message_id: int, current_user_id: str):
        # row = self.message_repo.find_by_id(message_id)[0]
        # message = Message.from_row(row)
        # message.delete()
        affected_rows = self.message_repo.delete_message_by_id(message_id, current_user_id)
        if affected_rows == 0:
            raise ValueError(f"메시지 ID {message_id}를 찾을 수 없습니다")
        return affected_rows
        
    async def save_file_to_db(self, data: dict):
        self.files_repo.save_file_to_db(data)

    async def find_file_by_message_id(self, data: dict):
        self.files_repo.find_file_by_message_id(data)

    # 디버깅용 다지우기 함수
    async def delete_all_message(self):
        self.message_repo.delete_all()
        
    
    
    
    # 검색
    async def search_messages(self, tab_id: int, keyword: str) -> List[Message]:
        return self.message_repo.search_messages(tab_id, keyword)