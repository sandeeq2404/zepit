from sqlalchemy import Column, Integer, String, Boolean, DECIMAL, TIMESTAMP
from sqlalchemy.dialects.mysql import JSON
from database import Base

class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    price = Column(DECIMAL(6, 2))
    is_available = Column(Boolean, default=True)


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    items = Column(JSON)
    status = Column(String(20), default="NEW")
    created_at = Column(TIMESTAMP)
