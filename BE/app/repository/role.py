from app.util.database.db_factory import DBFactory
from app.util.database.abstract_query_repo import AbstractQueryRepo

from typing import List, Optional
from datetime import datetime
import logging
from uuid import UUID

select_roles = """
select id, name from roles;
"""

select_all_roles = """
SELECT * FROM roles
WHERE workspace_id = %(workspace_id)s
  AND deleted_at IS NULL;
"""

select_all_member_roles = """
SELECT wm.nickname FROM member_roles mr
JOIN workspace_members wm ON wm.user_id = mr.user_id
JOIN group_members gm ON gm.user_id = mr.user_id
JOIN `groups` g ON g.id = gm.group_id
WHERE wm.workspace_id = %(workspace_id)s
  AND mr.role_id = %(role_id)s
  AND wm.deleted_at IS NULL;
"""

select_specific_group_name = """
SELECT
  g.name
FROM
  group_members gm
JOIN `groups` g ON g.id = gm.group_id
LEFT JOIN member_roles mr
  ON gm.user_id = mr.user_id AND mr.role_id = %(role_id)s
GROUP BY
  gm.group_id
HAVING
  COUNT(DISTINCT gm.user_id) = COUNT(DISTINCT mr.user_id);
"""

select_role_by_id = """
SELECT * FROM roles
WHERE id = %(id)s 
  AND workspace_id = %(workspace_id)s
  AND deleted_at IS NULL;
"""

select_role_by_user_id = """
SELECT r.* FROM roles r
JOIN member_roles mr ON r.id = mr.role_id
WHERE mr.user_id = %(user_id)s 
  AND r.workspace_id = %(workspace_id)s
  AND deleted_at IS NULL;
"""

select_role_by_name = """
SELECT * FROM roles
WHERE name = %(name)s 
  AND workspace_id = %(workspace_id)s
  AND deleted_at IS NULL;
"""

create_role = """
INSERT INTO roles (
    name, 
    workspace_id, 
    announce, 
    course, 
    channel
    )
VALUES (
    %(name)s, 
    %(workspace_id)s, 
    %(announce)s, 
    %(course)s, 
    %(channel)s
    );
"""

update_role = """
UPDATE roles 
SET name = %(name)s, 
    announce = %(announce)s,
    course = %(course)s,
    channel = %(channel)s,
    updated_at = %(updated_at)s
WHERE id = %(id)s 
  AND workspace_id = %(workspace_id)s 
"""

delete_role = """
UPDATE roles 
SET deleted_at = %(deleted_at)s
WHERE id = %(id)s 
  AND workspace_id = %(workspace_id)s 
"""

find_member_by_ws_id_user_id = """
SELECT * FROM member_roles mr
JOIN roles r ON mr.role_id = r.id
WHERE r.workspace_id = %(workspace_id)s 
  AND mr.user_id = %(user_id)s;
"""

delete_member_roles = """
DELETE mr FROM member_roles mr
JOIN roles r ON mr.role_id = r.id
WHERE r.workspace_id = %(workspace_id)s 
  AND mr.user_id = %(user_id)s;
"""

insert_member_roles = """
INSERT INTO member_roles (
    user_id,
    user_name,
    role_id
)
VALUE (
    %(user_id)s,
    %(user_name)s,
    %(role_id)s
);
"""

bulk_insert_member_roles = """
INSERT INTO member_roles (
    user_id, role_id, user_name
)
SELECT 
    u.id AS user_id,
    %(role_id)s AS role_id,
    %(name)s AS user_name
FROM users u
WHERE u.email = %(email)s
  AND NOT EXISTS (
    SELECT 1 
    FROM member_roles mr 
    WHERE mr.user_id = u.id 
      AND mr.role_id = %(role_id)s
  );
"""

class QueryRepo(AbstractQueryRepo):
    def __init__(self):
        db = DBFactory.get_db("MySQL")
        super().__init__(db)

    def get_all_roles(self):
        return self.db.execute(select_roles)

    def bulk_insert_member_roles(self, member_roles_list: list):
        return self.db.execute_many(bulk_insert_member_roles, member_roles_list)

    def insert_member_roles(self, data: dict):
        params = {
            "user_id": data["user_id"],
            "user_name": data["nickname"],
            "role_name": data["role"]
        }
        return self.db.execute(insert_member_roles, params)
    
    # 수정해야함
    def find_all(self, workspace_id: int):
        try:
            result = self.db.execute(select_all_roles, {"workspace_id": workspace_id})
            for i in range(0, len(result)):
                result[i] = list(result[i])
                user_names = []
                group_names=[]
                params = {
                    "workspace_id": workspace_id,
                    "role_id": result[i][0]
                }
                user_names_data = self.db.execute(select_all_member_roles, params)
                for name in user_names_data:
                    user_names.append(name[0])
                result[i].append(list(set(user_names)))
                group_names_data = self.db.execute(select_specific_group_name, params)                
                for group in group_names_data:
                    group_names.append(group[0])
                result[i].append(group_names)
                # for result[i][]
                print("\n\nfind_all, result: ", result)

            return result if result else []
        except Exception as e:
            logging.error(f"역할 목록 조회 실패 - workspace_id: {workspace_id}, error: {e}")
            raise Exception(f"역할 목록을 조회할 수 없습니다: {e}")

    def find(self, workspace_id: int, role_id: int) -> Optional[tuple]:
        param = {
            "workspace_id": workspace_id,
            "id": role_id
        }
        try:
            result = self.db.execute(select_role_by_id, param)
            if not result:
                raise ValueError(f"역할을 찾을 수 없습니다 - user_id: {role_id}, workspace_id: {workspace_id}")
            return result[0]
        except ValueError:
            raise
        except Exception as e:
            logging.error(f"역할 조회 실패 - role_id: {role_id}, workspace_id: {workspace_id}, error: {e}")
            raise Exception(f"역할을 조회할 수 없습니다: {e}")

    def find_by_user_id(self, workspace_id: int, user_id: UUID.bytes) -> Optional[tuple]:
        param = {
            "workspace_id": workspace_id,
            "user_id": user_id
        }
        try:
            result = self.db.execute(select_role_by_user_id, param)
            if not result:
                raise ValueError(f"역할을 찾을 수 없습니다 - user_id: {user_id}, workspace_id: {workspace_id}")
            return result[0]
        except ValueError:
            raise
        except Exception as e:
            logging.error(f"역할 조회 실패 - role_id: {user_id}, workspace_id: {workspace_id}, error: {e}")
            raise Exception(f"역할을 조회할 수 없습니다: {e}")

    def find_by_name(self, workspace_id: int, role_name: str) -> Optional[tuple]:
        param = {
            "workspace_id": workspace_id,
            "name": role_name
        }
        try:
            result = self.db.execute(select_role_by_name, param)
            if not result:
                raise ValueError(f"역할을 찾을 수 없습니다 - role_name: {role_name}, workspace_id: {workspace_id}")
            return result[0]
        except ValueError:
            raise
        except Exception as e:
            logging.error(f"역할명으로 조회 실패 - role_name: {role_name}, workspace_id: {workspace_id}, error: {e}")
            raise Exception(f"역할을 조회할 수 없습니다: {e}")
    
    def insert(self, workspace_id: int, role_name: str, permissions: List[str]):
        try:
            existing = self.db.execute(select_role_by_name, {
                "workspace_id": workspace_id,
                "name": role_name
            })
            if existing:
                raise ValueError(f"같은 이름의 역할이 이미 존재합니다 - role_name: {role_name}")
                
            param = {
                "workspace_id": workspace_id,
                "name": role_name,
                "announce": "announce" in permissions,
                "course": "course" in permissions,
                "channel": "channel" in permissions
            }
            result = self.db.execute(create_role, param)
            return result
        except ValueError:
            raise
        except Exception as e:
            logging.error(f"역할 생성 실패 - role_name: {role_name}, workspace_id: {workspace_id}, error: {e}")
            raise Exception(f"역할을 생성할 수 없습니다: {e}")
    
    def update(self, workspace_id: int, role_id: int, role_name: str, permissions: List):
        try:
            existing = self.db.execute(select_role_by_id, {
                "workspace_id": workspace_id,
                "id": role_id
            })
            if not existing:
                raise ValueError(f"수정할 역할을 찾을 수 없습니다 - role_id: {role_id}")
                
            param = {
                "id": role_id,
                "workspace_id": workspace_id,
                "name": role_name,
                "announce": "announce" in permissions,
                "course": "course" in permissions,
                "channel": "channel" in permissions,
                "updated_at": datetime.now()
            }
            result = self.db.execute(update_role, param)
            return result
        except ValueError:
            raise
        except Exception as e:
            logging.error(f"역할 수정 실패 - role_id: {role_id}, workspace_id: {workspace_id}, error: {e}")
            raise Exception(f"역할을 수정할 수 없습니다: {e}")
    
    def delete(self, workspace_id: int, role_id: int):
        try:
            existing = self.db.execute(select_role_by_id, {
                "workspace_id": workspace_id,
                "id": role_id
            })
            if not existing:
                raise ValueError(f"삭제할 역할을 찾을 수 없습니다 - role_id: {role_id}")
                
            param = {
                "id": role_id,
                "workspace_id": workspace_id,
                "deleted_at": datetime.now()
            }
            result = self.db.execute(delete_role, param)
            return result
        except ValueError:
            raise
        except Exception as e:
            logging.error(f"역할 삭제 실패 - role_id: {role_id}, workspace_id: {workspace_id}, error: {e}")
            raise Exception(f"역할을 삭제할 수 없습니다: {e}")

    # 미완
    def delete_mem_role(self, user_id: UUID.bytes, workspace_id: int):
        params = {
            "user_id": user_id,
            "workspace_id": workspace_id
        }
        find_res = self.db.execute(find_member_by_ws_id_user_id, params)
        del_res = self.db.execute(delete_member_roles, params)
        return len(find_res) == del_res["rowcount"]