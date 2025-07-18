from app.util.database.abstract_query_repo import AbstractQueryRepo
from app.util.database.db_factory import DBFactory
from uuid import UUID
from typing import List

class DMRepository(AbstractQueryRepo):
    def __init__(self):
        db = DBFactory.get_db("MySQL")
        super().__init__(db)

    def find_member_names(self, user_ids: List[str]):   
        user_id_bytes = [UUID(user_id).bytes for user_id in user_ids]
        format_strings = ','.join(['%s'] * len(user_id_bytes))               
        query = f"SELECT user_id, nickname FROM workspace_members WHERE user_id IN ({format_strings}) AND deleted_at IS NULL"        
        result = self.db.execute(query, tuple(user_id_bytes))
        return result