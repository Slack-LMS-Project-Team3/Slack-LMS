from pydantic import BaseModel
from datetime import datetime
from app.domain.save_message import SaveMessage


class SaveMessageSchema(BaseModel):
    save_message_id: int
    content: str
    created_at: datetime

    @classmethod
    def from_domain(cls, message: SaveMessage) -> "SaveMessageSchema":
        return cls(
            save_message_id=message.id,
            content=message.content,
            created_at=message.created_at,
        )