# app/models/media.py
from sqlalchemy import Column, Integer, String, ForeignKey, BigInteger, Text
from sqlalchemy.dialects.postgresql import JSONB
from .base import Base

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) 
    s3_key = Column(String, nullable=False) 
    url = Column(String, nullable=False)    # Полная публичная ссылка
    size = Column(BigInteger, nullable=True) # Размер 

    file_type = Column(String, default="image")  # "image", "pdf", "audio", "document" (более детально чем type)
    processing_status = Column(String, default="completed")  # "pending", "processing", "completed", "failed"
    extracted_text = Column(Text, nullable=True)  # текст из PDF/изображений
    file_metadata = Column(JSONB, nullable=True)  # дополнительные метаданные