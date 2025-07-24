from app.util.database.abstract_query_repo import AbstractQueryRepo
from app.util.database.db_factory import DBFactory

save_notion_page = """
INSERT INTO canvases (
    workspace_id, 
    tab_id, 
    page_id
) VALUES (
    %(workspace_id)s, 
    %(tab_id)s, 
    %(page_id)s
) ON DUPLICATE KEY UPDATE 
    page_id = VALUES(page_id),
    updated_at = CURRENT_TIMESTAMP;
"""

update_notion_page = """
UPDATE canvases SET page_id = %(page_id)s
WHERE workspace_id = %(workspace_id)s
  AND tab_id = %(tab_id)s;
"""

find_notion_page = """
SELECT page_id FROM canvases
WHERE workspace_id = %(workspace_id)s
  AND tab_id = %(tab_id)s
"""

class QueryRepo(AbstractQueryRepo):
    def __init__(self):
        db = DBFactory.get_db("MySQL")
        super().__init__(db)

    def insert(self, workspace_id: int, tab_id: int, page_id: str):
        param = {
            "workspace_id": workspace_id,
            "tab_id": tab_id,
            "page_id": page_id
        }
        self.db.execute(save_notion_page, param)
    
    def update(self, workspace_id: int, tab_id: int, page_id: str):
        param = {
            "workspace_id": workspace_id,
            "tab_id": tab_id,
            "page_id": page_id
        }
        self.db.execute(update_notion_page, param)

    def find_by_id(self, workspace_id: int, tab_id: int):
        param = {
            "workspace_id": workspace_id,
            "tab_id": tab_id
        }
        result = self.db.execute(find_notion_page, param)
        if result and len(result) > 0:
            return result[0][0]
        return None
