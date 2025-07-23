from app.util.database.abstract_query_repo import AbstractQueryRepo
from app.util.database.db_factory import DBFactory

insert_user = """
INSERT IGNORE INTO users (id, name, email, provider, workspace_id)
VALUES (%(id)s, %(name)s, %(email)s, %(provider)s, %(workspace_id)s);
"""

find_all_user = """
SELECT * FROM users;
"""

find_user_by_email = """
SELECT * FROM users WHERE email = %(user_email)s;
"""

find_user_by_provider_id_and_email = """
SELECT * FROM users WHERE provider_id = %(user_provider_id)s
                     AND email = %(user_email)s;
"""

update_provider_id = """
UPDATE users SET provider_id = %(user_provider_id)s
           WHERE email = %(user_email)s;
"""

update_user_id_in_workspace_members = """
UPDATE workspace_members SET user_id = %(user_id)s
                    WHERE email = %(user_email)s;
"""

save_refresh_token = """
INSERT INTO refresh_tokens (id, user_id, token, updated_at, deleted_at)
                      VALUE(%(id)s, %(user_id)s, %(user_refresh_token)s, NULL, NULL);
"""

find_refresh_token_by_refresh_token = """
SELECT * FROM refresh_tokens WHERE token = %(user_refresh_token)s;
"""

find_refresh_token_id_by_user_id_and_token = """
SELECT id FROM refresh_tokens
WHERE token = %(user_refresh_token)s AND user_id = unhex(%(user_id)s);
"""

remove_refresh_token_by_id = """
DELETE FROM refresh_tokens
WHERE id = %(refresh_tokens_id)s;
"""

class QueryRepo(AbstractQueryRepo):
    def __init__(self):
        db = DBFactory.get_db("MySQL")
        super().__init__(db)
        self.queries["find_all_user"] = find_all_user
        self.queries["find_user_by_email"] = find_user_by_email
        self.queries["find_user_by_provider_id_and_email"] = find_user_by_provider_id_and_email
        self.queries["update_provider_id"] = update_provider_id
        self.queries["save_refresh_token"] = save_refresh_token
        self.queries["find_refresh_token_by_refresh_token"] = find_refresh_token_by_refresh_token
        self.queries["find_refresh_token_id_by_user_id_and_token"] = find_refresh_token_id_by_user_id_and_token
        self.queries["update_user_id_in_workspace_members"] = update_user_id_in_workspace_members
        self.queries["insert_user"] = insert_user
        self.queries["remove_refresh_token_by_id"] = remove_refresh_token_by_id

    def bulk_insert_users(self, user_list: list):
        return self.db.execute_many(insert_user, user_list)