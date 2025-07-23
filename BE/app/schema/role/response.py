from __future__ import annotations
from pydantic import BaseModel
from typing import List

from app.domain.role import Role


class RoleResponse(BaseModel):
    role_id: int
    role_name: str
    user_names: list[str] | None
    group_names: list[str] | None
    permissions: List[str]
    
    @staticmethod
    def from_domain(role: Role) -> RoleResponse:
        return RoleResponse(
            role_id = role.id,
            role_name = role.name,
            user_names = role.user_names,
            group_names = role.group_names,
            permissions=[p.value for p in role.permissions]
        )
