from pydantic import BaseModel
from typing import List
from uuid import UUID

class GroupInfo(BaseModel):
    group_id: int
    group_name: str
    user_names: List[str]
    role_id : int
    role_name: str

class GroupSchema(BaseModel):
    infos: List[GroupInfo]

    @classmethod 
    def from_row(cls, rows: list) -> "GroupSchema":
        return cls(
            infos = [
                GroupInfo (
                    group_id = row[0],
                    group_name = row[1],
                    user_names = row[2],
                    role_id = row[3],
                    role_name = row[4]
                    ) for row in rows
                ]
            )
