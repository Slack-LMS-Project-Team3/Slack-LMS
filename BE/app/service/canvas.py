from app.repository.canvas import QueryRepo

class CanvasService:
    def __init__(self):
        self.repo = QueryRepo()
    
    def get_page_id(self, workspace_id: int, tab_id: int):
        return self.repo.find_by_id(workspace_id, tab_id)
    
    def save_page_id(self, workspace_id, tab_id, page_id):
        self.repo.insert(workspace_id, tab_id, page_id)