from uuid import UUID

from app.domain.save_message import SaveMessage
from app.repository.save_message import SaveMessageRepo


class SaveMessageService:
    def __init__(self):
        self.repo = SaveMessageRepo()

    async def save(self, user_id: UUID, workspace_id: int, content: str) -> SaveMessage:
        message = SaveMessage.of(user_id, workspace_id, content)
        result = await self.repo.insert(message)
        message.id = result.get("lastrowid") if isinstance(result, dict) else None
        return message

    async def get_all(self, user_id: UUID, workspace_id: int):
        return await self.repo.find_all_by_user(user_id, workspace_id)

    async def delete(self, message_id: int, user_id: UUID) -> None:
        await self.repo.delete_by_id(message_id, user_id)