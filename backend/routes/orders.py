from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Order
from schemas import OrderCreate

router = APIRouter(prefix="/orders", tags=["Orders"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    new_order = Order(items=order.items)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return {"id": new_order.id, "status": new_order.status}


@router.get("/kitchen")
def kitchen_orders(db: Session = Depends(get_db)):
    return db.query(Order).order_by(Order.created_at.desc()).all()
