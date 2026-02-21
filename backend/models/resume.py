from sqlalchemy import Column, Integer, Text
from database.db import Base

class Resume(Base):
    __tablename__ = "resume"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)