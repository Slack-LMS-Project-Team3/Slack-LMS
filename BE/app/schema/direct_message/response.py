from __future__ import annotations
from pydantic import BaseModel
from typing import Optional, List


class CreateTabResponse(BaseModel):
    tab_id: int
    tab_name: str

    @classmethod
    def from_row(cls, row: tuple, creator_name: str):
        tab_name = row[1] # tab_name == creator_name이라면 tab_name 그대로 사용
        print("origin: ",tab_name)
        member_names = tab_name.split(", ")
        if (len(member_names) > 1):
            member_names.remove(creator_name)
            tab_name = ", ".join(member_names) # tab_name != creator_name이라면 tab_name에서 creator_name 빼고 사용
            print("modified: ", tab_name)
        return cls(
            tab_id=row[0],
            tab_name=tab_name
        )