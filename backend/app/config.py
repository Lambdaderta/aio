from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "AIO Edication"
    debug: bool = True
    database_url: str = "sqlite:///./education.db"
    cors_origins: list = [
        "http://localhost:5137",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5137"
    ]
    static_dir: str = "static"
    images_dir: str = "static/images"

    class Config:
        env_file = ".env"

settings = Settings()
