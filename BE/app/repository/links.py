from app.util.database.db_factory import DBFactory
from app.util.database.abstract_query_repo import AbstractQueryRepo

from typing import List, Optional
from datetime import datetime
from zoneinfo import ZoneInfo
from uuid import UUID

# link_id: number
# tab_id: number
# link_url: string
# link_favicon?: string
# link_name: string

find_links_by_tab_id = """
SELECT id, tab_id, link_url, link_favicon, link_name 
FROM links
WHERE tab_id = %(tab_id)s
  AND deleted_at IS NULL;
"""

insert_link_at_tab = """
INSERT INTO links (tab_id, sender_id, link_url, link_favicon, link_name) 
VALUE (%(tab_id)s, %(user_id)s, %(link_url)s, %(favicon)s, %(link_name)s);
"""

delete_link_at_tab = """
UPDATE links 
SET deleted_at = %(deleted_at)s
WHERE id = %(link_id)s
  AND tab_id = %(tab_id)s;
"""

class QueryRepo(AbstractQueryRepo):
    def __init__(self):
        db = DBFactory.get_db("MySQL")
        super().__init__(db)

    def find_all_list_at_tab(self, workspace_id: int, tab_id: int):
        params = {
            "workspace_id": workspace_id,
            "tab_id": tab_id
        }
        return self.db.execute(find_links_by_tab_id, params)

    def insert_link(self, workspace_id: int, tab_id: int, link_url: str, link_name: str, favicon: str, user_id: str):
        params = {
            "workspace_id": workspace_id,
            "tab_id": tab_id,
            "link_url": link_url,
            "link_name": link_name,
            "favicon": favicon,   
            "user_id": UUID(user_id).bytes
        }
        print("\n\n\ninsert_link, params: ", params)
        res = self.db.execute(insert_link_at_tab, params)
        print("insert_link, res: ", res["rowcount"])
        return res["rowcount"] == 1 
    
    def delete_link(self, workspace_id: int, tab_id: int, link_id: str):
        params = {
            "workspace_id": workspace_id,
            "tab_id": tab_id,
            "link_id": int(link_id),
            "deleted_at": datetime.now(ZoneInfo("Asia/Seoul")).strftime("%Y-%m-%d %H:%M:%S")
        }
        print("\n\n\delete_link, params: ", params)
        res = self.db.execute(delete_link_at_tab, params)
        print("insert_link, res: ", res["rowcount"])
        return res["rowcount"] == 1 