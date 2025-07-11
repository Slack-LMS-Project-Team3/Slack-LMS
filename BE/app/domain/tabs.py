from __future__ import annotations
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

@dataclass
class Tabs:
    id: int
    workspace_id: int
    section_id: int
    name: str = ""
    created_at: datetime = datetime.now()
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None
    is_pinned: bool = field(default_factory=False)

@dataclass
class SubTabs:
    id: int
    workspace_id: int
    section_id: int
    tab_id: int
    name: str = ""
    created_at: datetime = datetime.now()
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None
    is_pinned: bool = field(default_factory=False)