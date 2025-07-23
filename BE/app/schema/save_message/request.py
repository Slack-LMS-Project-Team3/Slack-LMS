from pydantic import BaseModel, constr

class SaveMessageCreate(BaseModel):
    workspace_id: int
    content: constr(min_length=1)
