from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime
from typing import Optional
from enum import Enum
import uuid


class MessageUpdateType(str, Enum):
    MODIFY = "modify"
    DELETE = "delete"

@dataclass
class Message:
    id: Optional[int] = None
    tab_id: Optional[int] = None
    sender_id: Optional[uuid.UUID] = None
    content: Optional[str] = None
    is_updated: bool = False
    created_at: datetime = datetime.now()
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None
    update_type: MessageUpdateType = MessageUpdateType.MODIFY
    file_url: Optional[str] = None
    like: Optional[int] = None

    @staticmethod
    def of(tab_id: int, sender_id: uuid.UUID, content: str, file_url: Optional[str]) -> Message:
        return Message(
            tab_id=tab_id,
            sender_id=sender_id,
            content=content,
            file_url=file_url
        )

    @staticmethod
    def from_row(row: tuple) -> Message:
        return Message(
            id=row[0],
            tab_id=row[1],
            sender_id=uuid.UUID(bytes=row[2]) if isinstance(row[2], bytes) else row[2],
            content=row[3],
            is_updated=row[4],
            created_at=row[5],
            updated_at=row[6],
            deleted_at=row[7],
            file_url=row[8] if len(row) > 8 else None
        )

    def modify(self, new_content: str):
        self.content = new_content
        self.updated_at = datetime.now()
        self.is_updated = True
    
    def delete(self):
        self.deleted_at = datetime.now()
        self.update_type = MessageUpdateType.DELETE


@dataclass
class Emoji:
    msg_id: Optional[int] = None
    tab_id: Optional[int] = None
    user_id: Optional[uuid.UUID] = None
    emoji_type: str = None

    @staticmethod
    def of(tab_id: int, user_id: uuid.UUID, msg_id: int, type: str) -> Emoji:
        return Emoji(
            msg_id=msg_id,
            tab_id=tab_id,
            user_id=user_id,
            emoji_type= type,
        )