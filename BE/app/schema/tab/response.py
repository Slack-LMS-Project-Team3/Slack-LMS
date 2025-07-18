from __future__ import annotations
from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID

class TabInfo(BaseModel):
    tab_id: int
    tab_name: str
    section_id: int
    section_name: str

    @classmethod
    def from_row(cls, row: tuple) -> TabInfo:
        return cls(
            tab_id=row[0],
            tab_name=row[1],
            section_id=row[2],
            section_name=row[3]
        )


class TabDetailInfo(BaseModel):
    tab_id: int
    tab_name: str
    section_id: int
    section_name: str
    members_count: int

    @classmethod
    def from_rows(cls, rows: List[tuple]) -> TabDetailInfo:
        members_count = len(rows)
        row = rows[0]
        return cls(
            tab_id=row[0],
            tab_name=row[1],
            section_id=row[2],
            section_name=row[3],
            members_count=members_count
        )


class TabMember(BaseModel):
    user_id: str
    nickname: str
    image: Optional[str]
    role: str
    groups: List[Optional[str]]

    @classmethod
    def from_row(cls, row: tuple) -> Optional[TabMember]:
        return cls(
            user_id=row[0].hex(),
            nickname=row[1],
            image=row[2],
            role=row[3],
            groups=row[4].split(",") if row[4] is not None else []
        )    

class TabGroupMember(BaseModel):
    group_id: str
    group_name: str
    role_name: str
    group_members_count: int

    @classmethod
    def from_row(cls, row: list) -> TabGroupMember:
        return cls(
            group_id=str(row[0]),
            group_name=row[1],
            role_name=row[2],
            group_members_count=row[3]
        )

class TabInvitation(BaseModel):
    members_count: int
    nicknames: List[str]

    @classmethod
    def from_rows(cls, rows: List[tuple]) -> TabInvitation:
        members_count = len(rows)
        return cls(
            members_count=members_count,
            nicknames=[row[0] for row in rows]
        )
    

class CreateTabResponse(BaseModel):
    tab_id: int
    tab_name: str
    section_id: int

    @classmethod
    def from_row(cls, row: tuple) -> CreateTabResponse:
        return cls(
            tab_id=row[0],
            tab_name=row[1],
            section_id=row[2]
        )