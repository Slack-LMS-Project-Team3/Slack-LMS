from pydantic import BaseModel, EmailStr
from typing import Optional, List

class WorkspaceMemberSchema(BaseModel):
    user_id: str
    workspace_id: Optional[int] = None
    nickname: str
    email: EmailStr
    image: Optional[str] = None
    role_name: Optional[str] = None
    group_name: Optional[List[str]] = None
    github: Optional[str] = None
    blog: Optional[str] = None

    @classmethod 
    def from_row(cls, row: tuple) -> "WorkspaceMemberSchema":
        return cls(
            user_id=row[0].hex(),
            workspace_id=row[1],
            nickname=row[2],
            email=row[3],
            image=row[4],
            role_name=row[5],
            group_name=row[6].split(',') if isinstance(row[6], str) else [],
            github=row[7],
            blog=row[8]
        )


class WorkspaceMemberResponse(BaseModel):
    workspace_member: WorkspaceMemberSchema
