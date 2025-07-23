from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime
from typing import Optional
import uuid


@dataclass
class SaveMessage:
    id: Optional[int] = None
    user_id: Optional[uuid.UUID] = None
    workspace_id: Optional[int] = None
    content: Optional[str] = None
    created_at: datetime = datetime.now()
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None

    @staticmethod
    def of(user_id: uuid.UUID, workspace_id: int, content: str) -> SaveMessage:
        return SaveMessage(
            user_id=user_id,
            workspace_id=workspace_id,
            content=content
        )

    @staticmethod
    def from_row(row: tuple) -> SaveMessage:
        return SaveMessage(
            id=row[0],
            user_id=uuid.UUID(bytes=row[1]) if isinstance(row[1], bytes) else row[1],
            workspace_id=row[2],
            content=row[3],
            created_at=row[4],
            updated_at=row[5],
            deleted_at=row[6]
        )

    def delete(self):
        self.deleted_at = datetime.now()
