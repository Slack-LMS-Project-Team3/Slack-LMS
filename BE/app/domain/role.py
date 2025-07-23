from __future__ import annotations
from dataclasses import dataclass, field
from enum import Enum
from typing import List, Optional
from datetime import datetime

class PermissionType(str, Enum):
    ADMIN = "admin"
    ANNOUNCE = "announce"
    COURSE = "course"
    CHANNEL = "channel"

@dataclass
class Role:
    id: Optional[int] = None
    name: str = ""
    workspace_id: int = 0
    permissions: List[PermissionType] = field(default_factory=set)
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None
    # 추가 전송
    user_names: Optional[List[str]] = None
    group_names: Optional[List[str]] = None

    @classmethod
    def from_row(cls, row) -> Role:
        permissions = [
            PermissionType.ADMIN if row[3] else None,
            PermissionType.ANNOUNCE if row[4] else None,
            PermissionType.COURSE if row[5] else None, 
            PermissionType.CHANNEL if row[6] else None
        ]
        if len(row) < 11:
            return cls(
                id=row[0],
                name=row[1],
                workspace_id=row[2],
                permissions=[p for p in permissions if p],
                created_at=row[7],
                updated_at=row[8],
                deleted_at=row[9],
                user_names=None,
                group_names=None
            )
        else:
            return cls(
                id=row[0],
                name=row[1],
                workspace_id=row[2],
                permissions=[p for p in permissions if p],
                created_at=row[7],
                updated_at=row[8],
                deleted_at=row[9],
                user_names=row[10],
                group_names=row[11]
            )
