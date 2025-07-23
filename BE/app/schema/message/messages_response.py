from __future__ import annotations
import uuid
from pydantic import BaseModel
from typing import List
from datetime import datetime
from typing import Optional
from uuid import UUID


class MessageSchema(BaseModel):
    msg_id: int
    tab_id: int
    sender_id: str
    nickname: str
    image: Optional[str] = None
    content: str
    is_updated: bool
    created_at: datetime
    updated_at: datetime | None
    deleted_at: datetime | None
    file_url: Optional[str] = None
    e_check_cnt: int
    e_clap_cnt: int
    e_like_cnt: int
    e_pray_cnt: int
    e_sparkle_cnt: int
    my_toggle: Optional[dict] = None

    # [0]: m.id
    # [1]: m.tab_id
    # [2]: m.sender_id
    # [3]: wm.nickname
    # [4]: wm.image
    # [5]: m.content
    # [6]: m.is_updated
    # [7]: m.created_at
    # [8]: m.updated_at
    # [9]: m.deleted_at
    # [10]: m.url
    # [11]: m.check_cnt
    # [12]: m.clap_cnt
    # [13]: m.like_cnt
    # [14]: m.pray_cnt,
    # [15]: m.sparkle_cnt,
    # [16]: e.e_check,
    # [17]: e.e_clap,
    # [18]: e.e_like,
    # [19]: e.e_pray,
    # [20]: e.e_sparkle
    @classmethod
    def from_row(cls, row: tuple) -> MessageSchema:
        res = {}
        if row[16] == 1: res["check"]=True
        else: res["check"]=False
        if row[17] == 1: res["clap"]=True
        else: res["clap"]=False
        if row[18] == 1: res["like"]=True
        else: res["like"]=False
        if row[19] == 1: res["pray"]=True
        else: res["pray"]=False
        if row[20] == 1: res["sparkle"]=True
        else: res["sparkle"]=False

        return cls(
            msg_id=row[0],
            tab_id=row[1],
            sender_id=row[2].hex(),
            nickname=row[3],
            image=row[4] or "",
            content=row[5],
            is_updated=row[6],
            created_at=row[7],
            updated_at=row[8],
            deleted_at=row[9],
            file_url=row[10] if row[10] else None,
            e_check_cnt=row[11],
            e_clap_cnt=row[12],
            e_like_cnt=row[13],
            e_pray_cnt=row[14],
            e_sparkle_cnt=row[15],
            my_toggle=res
        )


class MessagesResponse(BaseModel):
    messages: List[MessageSchema]