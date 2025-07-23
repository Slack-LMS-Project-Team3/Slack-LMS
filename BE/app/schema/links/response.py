from pydantic import BaseModel
from typing import List
from uuid import UUID

class LinkSchema(BaseModel):
    link_id: int
    tab_id: int
    link_url: str
    link_favicon: str | None
    link_name: str

    @classmethod 
    def from_row(cls, row: tuple) -> "LinkSchema":
        return cls(
            link_id = row[0],
            tab_id = row[1],
            link_url = row[2],
            link_favicon = row[3],
            link_name = row[4]
        )

