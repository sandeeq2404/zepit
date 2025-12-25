from pydantic import BaseModel
from typing import List

class MenuItemResponse(BaseModel):
    id: int
    name: str
    price: float
    is_available: bool

    class Config:
        orm_mode = True


class OrderCreate(BaseModel):
    items: List[str]


class OrderResponse(BaseModel):
    id: int
    status: str
