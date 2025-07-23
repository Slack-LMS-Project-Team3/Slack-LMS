from uuid import UUID
from typing import List
from datetime import datetime

from app.domain.save_message import SaveMessage
from app.util.database.abstract_query_repo import AbstractQueryRepo
from app.util.database.db_factory import DBFactory

insert_message = """
INSERT INTO save_messages (
    user_id,
    workspace_id,
    content
)
VALUES (
    %(user_id)s,
    %(workspace_id)s,
    %(content)s
);
"""

find_all_by_user = """
SELECT 
    id, user_id, workspace_id, content, 
    created_at, updated_at, deleted_at
FROM save_messages
WHERE user_id = %(user_id)s 
AND workspace_id = %(workspace_id)s
AND deleted_at IS NULL
ORDER BY created_at DESC;
"""

delete_message = """
UPDATE save_messages
SET 
    deleted_at = %(deleted_at)s
WHERE id = %(message_id)s
  AND user_id = %(current_user_id)s
  AND deleted_at IS NULL;
"""

class SaveMessageRepo(AbstractQueryRepo):
    def __init__(self):
        db = DBFactory.get_db("MySQL")
        super().__init__(db)

    async def insert(self, save_message: SaveMessage):
        user_id = save_message.user_id
        user_id_bytes = (
            user_id.bytes if isinstance(user_id, UUID)
            else UUID(str(user_id)).bytes
        )

        params = {
            "workspace_id": save_message.workspace_id,
            "user_id": user_id_bytes,
            "content": save_message.content
        }
        return self.db.execute(insert_message, params)

    async def find_all_by_user(self, user_id: UUID, workspace_id: int) -> List[SaveMessage]:
        user_id_bytes = (
            user_id.bytes if isinstance(user_id, UUID)
            else UUID(str(user_id)).bytes
        )
        params = {
            "user_id": user_id_bytes,
            "workspace_id": workspace_id
        }
        rows = self.db.execute(find_all_by_user, params)
        return [SaveMessage.from_row(row) for row in rows]

    async def delete_by_id(self, message_id: int, user_id: UUID):
        user_id_bytes = (
            user_id.bytes if isinstance(user_id, UUID)
            else UUID(str(user_id)).bytes
        )
        params = {
            "message_id": message_id,
            "current_user_id": user_id_bytes,
            "deleted_at": datetime.now()
        }
        self.db.execute(delete_message, params)