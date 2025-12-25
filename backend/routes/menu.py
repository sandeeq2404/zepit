from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import MenuItem

router = APIRouter(prefix="/menu", tags=["Menu"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_menu(db: Session = Depends(get_db)):
    return db.query(MenuItem).filter(MenuItem.is_available == True).all()
