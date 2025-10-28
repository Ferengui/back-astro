import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

class Settings:
    # MongoDB
    MONGO_URL: str = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    DB_NAME: str = os.environ.get('DB_NAME', 'astromean_db')
    
    # CORS
    CORS_ORIGINS: str = os.environ.get('CORS_ORIGINS', '*')
    
    # JWT Authentication (fake keys for development)
    SECRET_KEY: str = os.environ.get('SECRET_KEY', 'fake-secret-key-change-in-production-12345')
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # SSO Configuration (placeholder for future)
    GOOGLE_CLIENT_ID: str = os.environ.get('GOOGLE_CLIENT_ID', 'fake-google-client-id')
    GOOGLE_CLIENT_SECRET: str = os.environ.get('GOOGLE_CLIENT_SECRET', 'fake-google-secret')
    
settings = Settings()
