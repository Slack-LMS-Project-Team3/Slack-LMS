from typing import List
from uuid import UUID

from app.util.database.abstract_query_repo import AbstractQueryRepo
from app.util.database.db_factory import DBFactory
from app.domain.message import Message, MessageUpdateType, Emoji
from datetime import datetime
from fastapi import HTTPException

insert_message = """
INSERT INTO messages (
    tab_id,
    sender_id,
    content,
    url
)
VALUES (
    %(tab_id)s,
    %(sender_id)s,
    %(content)s,
    %(url)s
);
"""

find_msg_emoji = """
SELECT * from emoji
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s
"""

insert_emoji_check = """
INSERT emoji (msg_id, e_check, user_id)
VALUE (%(msg_id)s, 1, %(sender_id)s)
"""

insert_emoji_clap = """
INSERT emoji (msg_id, e_clap, user_id)
VALUE (%(msg_id)s, 1, %(sender_id)s)
"""

insert_emoji_like = """
INSERT emoji (msg_id, e_like, user_id)
VALUE (%(msg_id)s, 1, %(sender_id)s)
"""

insert_emoji_pray = """
INSERT emoji (msg_id, e_pray, user_id)
VALUE (%(msg_id)s, 1, %(sender_id)s)
"""

insert_emoji_sparkle = """
INSERT emoji (msg_id, e_sparkle, user_id)
VALUE (%(msg_id)s, 1, %(sender_id)s)
"""

update_emoji_check = """
UPDATE emoji
SET e_check = 1
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s
"""

update_emoji_clap = """
UPDATE emoji
SET e_clap = 1
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s
"""

update_emoji_like = """
UPDATE emoji
SET e_like = 1
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s
"""

update_emoji_pray = """
UPDATE emoji
SET e_pray = 1
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s
"""

update_emoji_sparkle = """
UPDATE emoji
SET e_sparkle = 1
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s
"""

minus_emoji_check = """
UPDATE emoji
SET e_check = 0
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s
"""

minus_emoji_clap = """
UPDATE emoji
SET e_clap = 0
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s
"""

minus_emoji_like = """
UPDATE emoji
SET e_like = 0
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s
"""

minus_emoji_pray = """
UPDATE emoji
SET e_pray = 0
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s
"""

minus_emoji_sparkle = """
UPDATE emoji
SET e_sparkle = 0
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s
"""

delete_emoji = """
DELETE FROM emoji
WHERE msg_id = %(msg_id)s
  AND user_id = %(sender_id)s;
"""

count_checks = """
SELECT COUNT(*) FROM emoji
WHERE msg_id = %(msg_id)s
  AND e_check = 1;
"""

count_claps = """
SELECT COUNT(*) FROM emoji
WHERE msg_id = %(msg_id)s
  AND e_clap = 1;
"""

count_likes = """
SELECT COUNT(*) FROM emoji
WHERE msg_id = %(msg_id)s
  AND e_like = 1;
"""

count_prays = """
SELECT COUNT(*) FROM emoji
WHERE msg_id = %(msg_id)s
  AND e_pray = 1;
"""

count_sparkles = """
SELECT COUNT(*) FROM emoji
WHERE msg_id = %(msg_id)s
  AND e_sparkle = 1;
"""

update_check_cnt = """
UPDATE messages
SET 
    check_cnt = %(cnt)s
WHERE id = %(msg_id)s;
"""

update_clap_cnt = """
UPDATE messages
SET 
    clap_cnt = %(cnt)s
WHERE id = %(msg_id)s;
"""

update_like_cnt = """
UPDATE messages
SET 
    like_cnt = %(cnt)s
WHERE id = %(msg_id)s;
"""

update_pray_cnt = """
UPDATE messages
SET 
    pray_cnt = %(cnt)s
WHERE id = %(msg_id)s;
"""

update_sparkle_cnt = """
UPDATE messages
SET 
    sparkle_cnt = %(cnt)s
WHERE id = %(msg_id)s;
"""

update_message = """
UPDATE messages
SET 
    content = %(new_content)s,
    is_updated = 1
WHERE id = %(message_id)s
  AND sender_id = %(current_user_id)s -- 권한 검증
  AND deleted_at IS NULL;
"""

delete_message = """
UPDATE messages
SET 
    deleted_at = %(deleted_at)s
WHERE id = %(message_id)s
  AND sender_id = %(current_user_id)s
  AND deleted_at IS NULL;
"""

find_message = """
SELECT 
    id, tab_id, sender_id, content, 
    is_updated, created_at, updated_at, deleted_at, url
FROM messages 
WHERE id = %(id)s;
"""

find_all_messages = """
SELECT 
    m.id,
    m.tab_id,
    m.sender_id,
    wm.nickname,
    wm.image,
    m.content,
    m.is_updated,
    m.created_at,
    m.updated_at,
    m.deleted_at,
    m.url
FROM messages m
JOIN workspace_members wm
ON m.sender_id = wm.user_id
WHERE m.tab_id = %(tab_id)s
AND m.deleted_at IS NULL;
"""

# 페이징
find_recent_30_latest = """
SELECT 
    m.id,
    m.tab_id,
    m.sender_id,
    wm.nickname,
    wm.image,
    m.content,
    m.is_updated,
    m.created_at,
    m.updated_at,
    m.deleted_at,
    m.url,
    m.check_cnt,
    m.clap_cnt,
    m.like_cnt,
    m.pray_cnt,
    m.sparkle_cnt,
    COALESCE(e.e_check, 0),
    COALESCE(e.e_clap, 0),
    COALESCE(e.e_like, 0),
    COALESCE(e.e_pray, 0),
    COALESCE(e.e_sparkle, 0)
FROM messages m
JOIN workspace_members wm ON m.sender_id = wm.user_id
LEFT JOIN emoji e ON m.id = e.msg_id AND e.user_id = %(user_id)s
WHERE m.tab_id = %(tab_id)s
AND m.deleted_at IS NULL
ORDER BY m.id DESC
LIMIT 30;
"""



find_recent_30_before = """
SELECT 
    m.id,
    m.tab_id,
    m.sender_id,
    wm.nickname,
    wm.image,
    m.content,
    m.is_updated,
    m.created_at,
    m.updated_at,
    m.deleted_at,
    m.url,
    m.check_cnt,
    m.clap_cnt,
    m.like_cnt,
    m.pray_cnt,
    m.sparkle_cnt,
    COALESCE(e.e_check, 0),
    COALESCE(e.e_clap, 0),
    COALESCE(e.e_like, 0),
    COALESCE(e.e_pray, 0),
    COALESCE(e.e_sparkle, 0)
FROM messages m
JOIN workspace_members wm ON m.sender_id = wm.user_id
LEFT JOIN emoji e ON m.id = e.msg_id AND e.user_id = %(user_id)s
WHERE m.tab_id = %(tab_id)s
AND m.id < %(message_id)s
AND m.deleted_at IS NULL
ORDER BY m.id DESC
LIMIT 30;
"""

# 디버깅용
delete_all_message = """
DELETE FROM messages
WHERE id > 0;
"""

#검색
search_messages_by_keyword = """
SELECT
    m.id,
    m.tab_id,
    m.sender_id,
    wm.nickname,
    wm.image,
    m.content,
    m.is_updated,
    m.created_at,
    m.updated_at,
    m.deleted_at,
    m.url
FROM messages m
JOIN workspace_members wm ON m.sender_id = wm.user_id
WHERE m.tab_id = %(tab_id)s
  AND m.deleted_at IS NULL
  AND m.content LIKE %(pattern)s
ORDER BY m.id DESC;
"""


class QueryRepo(AbstractQueryRepo):
    def __init__(self):
        db = DBFactory.get_db("MySQL")
        super().__init__(db)
    
    def find_by_id(self, id: int) -> Message:
        param = {
            "id": id
        }
        return self.db.execute(find_message, param)

    def find_all(self, tab_id: int) -> List[Message]:
        param = {
            "tab_id": tab_id
        }
        return self.db.execute(find_all_messages, param)

    def find_recent_30(self, tab_id: int, before_id: int | None, user_id: str) -> List[Message]:
        print("before_id: ", before_id)
        if before_id == None:
            params = {
                "tab_id": tab_id, 
                "user_id": UUID(user_id).bytes
            }
            return self.db.execute(find_recent_30_latest, params)
        else:
            params = {
                "tab_id": tab_id, 
                "message_id": before_id,
                "user_id": UUID(user_id).bytes
            }
            return self.db.execute(find_recent_30_before, params)

    def insert(self, message: Message):
        # sender_id가 이미 UUID라면 변환하지 않고, str이면 UUID로 변환
        sender_id = message.sender_id
        if isinstance(sender_id, UUID):
            sender_id_bytes = sender_id.bytes
        else:
            sender_id_bytes = UUID(str(sender_id)).bytes
        params = {
            "tab_id": message.tab_id,
            "sender_id": sender_id_bytes,
            "content": message.content,
            "url": message.file_url
        }
        return self.db.execute(insert_message, params)
    
    def plus_emoji(self, emoji: Emoji):
        # sender_id가 이미 UUID라면 변환하지 않고, str이면 UUID로 변환
        sender_id = emoji.user_id
        if isinstance(sender_id, UUID):
            sender_id_bytes = sender_id.bytes
        else:
            sender_id_bytes = UUID(str(sender_id)).bytes

        params = {
            "tab_id": emoji.tab_id,
            "sender_id": sender_id_bytes,
            "msg_id": emoji.msg_id,
        }
        target = self.db.execute(find_msg_emoji, params)
        if target == []:
            if emoji.emoji_type == "check":
                sql = insert_emoji_check
            elif emoji.emoji_type == "clap":
                sql = insert_emoji_clap
            elif emoji.emoji_type == "sparkle":
                sql = insert_emoji_clap
            elif emoji.emoji_type == "pray":
                sql = insert_emoji_pray
            else:
                sql = insert_emoji_like
        else:
            if emoji.emoji_type == "check":
                sql = update_emoji_check
            elif emoji.emoji_type == "clap":
                sql = update_emoji_clap
            elif emoji.emoji_type == "sparkle":
                sql = update_emoji_sparkle
            elif emoji.emoji_type == "pray":
                sql = update_emoji_pray
            else:
                sql = update_emoji_like
        return self.db.execute(sql, params)
                
    def minus_emoji(self, emoji: Emoji):
        # sender_id가 이미 UUID라면 변환하지 않고, str이면 UUID로 변환
        sender_id = emoji.user_id
        if isinstance(sender_id, UUID):
            sender_id_bytes = sender_id.bytes
        else:
            sender_id_bytes = UUID(str(sender_id)).bytes

        params = {
            "tab_id": emoji.tab_id,
            "sender_id": sender_id_bytes,
            "msg_id": emoji.msg_id,
        }
        if emoji.emoji_type == "check":
            sql = minus_emoji_check
        elif emoji.emoji_type == "clap":
            sql = minus_emoji_clap
        elif emoji.emoji_type == "sparkle":
            sql = minus_emoji_sparkle
        elif emoji.emoji_type == "pray":
            sql = minus_emoji_pray
        else:
            sql = minus_emoji_like
        self.db.execute(sql, params)
        target = self.db.execute(find_msg_emoji, params)
        
        if target[0][1] and target[0][2] and target[0][3]:
            self.db.execute(delete_emoji, params)
        return
    
    def update_emoji_cnt(self, emoji: Emoji):
        # sender_id가 이미 UUID라면 변환하지 않고, str이면 UUID로 변환
        sender_id = emoji.user_id
        if isinstance(sender_id, UUID):
            sender_id_bytes = sender_id.bytes
        else:
            sender_id_bytes = UUID(str(sender_id)).bytes

        params = {
            "tab_id": emoji.tab_id,
            "sender_id": sender_id_bytes,
            "msg_id": emoji.msg_id,
        }
        if emoji.emoji_type == "check":
            sql = count_checks
        elif emoji.emoji_type == "clap":
            sql = count_claps
        elif emoji.emoji_type == "sparkle":
            sql = count_sparkles
        elif emoji.emoji_type == "pray":
            sql = count_prays
        else:
            sql = count_likes
        res = self.db.execute(sql, params)
        print("\n\n\n 확인좀 하자, cnt: ", res[0][0])

        params = {
            "msg_id": emoji.msg_id,
            "cnt": res[0][0],
        }
        if emoji.emoji_type == "check":
            sql = update_check_cnt
        elif emoji.emoji_type == "clap":
            sql = update_clap_cnt
        elif emoji.emoji_type == "sparkle":
            sql = update_sparkle_cnt
        elif emoji.emoji_type == "pray":
            sql = update_pray_cnt            
        else:
            sql = update_like_cnt
        return self.db.execute(sql, params)
    
    def update_message_content(self, message_id: int, new_content: str, current_user_id: str):
        params = {
            "message_id": message_id, 
            "new_content": new_content,
            "current_user_id": UUID(current_user_id).bytes
        }
        result = self.db.execute(update_message, params)
        
        if result["rowcount"] == 0:
            raise HTTPException(
            status_code=403, 
            detail="메시지 수정 권한이 없거나 메시지를 찾을 수 없습니다"
        )
        return result

    def delete_message_by_id(self, message_id: int, current_user_id: str):
        params = {
            "message_id": message_id,
            "deleted_at": datetime.now(),
            "current_user_id": UUID(current_user_id).bytes  # 권한 검증용
        }
        result = self.db.execute(delete_message, params)
        if result["rowcount"] == 0:
            raise HTTPException(
            status_code=403, 
            detail="메시지 삭제 권한이 없거나 메시지를 찾을 수 없습니다"
        )
        return result["rowcount"]
    
    def delete_all(self):
        print("delete_all_message")
        return self.db.execute(delete_all_message)
    
    def search_messages(self, tab_id: int, keyword: str):
        param = {
            "tab_id": tab_id,
            "pattern": f"%{keyword}%",
        }
        return self.db.execute(search_messages_by_keyword, param)
        