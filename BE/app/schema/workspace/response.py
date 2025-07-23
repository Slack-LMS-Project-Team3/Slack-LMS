from pydantic import BaseModel
from typing import List
from uuid import UUID
class WorkspaceNameSchema(BaseModel):
    workspace_id: int
    workspace_name: str

    @classmethod 
    def from_row(cls, row: tuple) -> "WorkspaceNameSchema":
        return cls(
            workspace_id=row[0],
            workspace_name=row[1]
        )

class InsertWorkspaceSchema(BaseModel):
    success_count: int

    @classmethod 
    def from_dict(cls, dict: dict) -> "InsertWorkspaceSchema":
        return cls(
            success_count=dict["success_count"]
        )


class MemberInfo(BaseModel):
    user_id: str
    nickname: str
    email: str
    image: str | None
    role_id: int
    role_name: str
    group_id: List
    group_name: List


class WorkspaceMembersSchema(BaseModel):
    mem_infos: List[MemberInfo]

    @classmethod 
    def from_row(cls, rows: List[list]) -> "WorkspaceMembersSchema":
        return cls(
            mem_infos = [
                MemberInfo(
                    user_id= UUID(bytes=row[0]).hex,
                    nickname= row[1],
                    email= row[2],
                    image= row[3],
                    role_id= row[4],
                    role_name= row[5],
                    group_id= row[6],
                    group_name= row[7],
                )
                for row in rows
            ]
        )
