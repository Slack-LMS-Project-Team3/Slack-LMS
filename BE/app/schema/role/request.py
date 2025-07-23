from pydantic import BaseModel
from typing import List

class CreateRoleRequest(BaseModel):
    role_name: str
    permissions: List
    
    
class ModifyRoleRequest(BaseModel):
    role_name: str
    permissions: List
    
    
class DeleteRoleRequest(BaseModel):
    name: str