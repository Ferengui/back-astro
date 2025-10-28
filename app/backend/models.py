from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional, List
from datetime import datetime, timezone
import uuid

# ============= Base Models =============

class Element(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    symbol: str

class Quality(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str

class Polarity(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    symbol: str

# ============= Astrological Models =============

class Planet(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    symbol: str
    element_id: Optional[str] = None
    quality_id: Optional[str] = None
    polarity_id: Optional[str] = None
    luminary: bool = False
    description: str
    image_url: Optional[str] = None
    distance_from_sun: Optional[float] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PlanetCreate(BaseModel):
    name: str
    symbol: str
    element_id: Optional[str] = None
    quality_id: Optional[str] = None
    polarity_id: Optional[str] = None
    luminary: bool = False
    description: str
    image_url: Optional[str] = None
    distance_from_sun: Optional[float] = None

class Sign(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    symbol: str
    element_id: str
    quality_id: str
    polarity_id: str
    ruling_planet_id: Optional[str] = None
    description: str
    date_range: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SignCreate(BaseModel):
    name: str
    symbol: str
    element_id: str
    quality_id: str
    polarity_id: str
    ruling_planet_id: Optional[str] = None
    description: str
    date_range: str

class House(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    number: int
    life_area: str
    natural_sign_id: Optional[str] = None
    ruling_planet_id: Optional[str] = None
    description: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class HouseCreate(BaseModel):
    number: int
    life_area: str
    natural_sign_id: Optional[str] = None
    ruling_planet_id: Optional[str] = None
    description: str

# ============= User Models =============

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    birth_date: Optional[str] = None
    birth_time: Optional[str] = None
    birth_location: Optional[str] = None
    birth_latitude: Optional[float] = None
    birth_longitude: Optional[float] = None
    roles: List[str] = Field(default_factory=lambda: ["user"])
    energy_distribution_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    birth_date: Optional[str] = None
    birth_time: Optional[str] = None
    birth_location: Optional[str] = None
    birth_latitude: Optional[float] = None
    birth_longitude: Optional[float] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

# ============= Astral Chart Models =============

class Position(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    planet_id: str
    sign_id: str
    house_id: str
    degree: float
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PositionCreate(BaseModel):
    user_id: str
    planet_id: str
    sign_id: str
    house_id: str
    degree: float

class EnergyDistribution(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    fire: float = 0
    earth: float = 0
    air: float = 0
    water: float = 0
    yang: float = 0
    yin: float = 0
    cardinal: float = 0
    fixed: float = 0
    mutable: float = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ============= Course Models =============

class Course(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    level: str  # beginner, intermediate, advanced
    image_url: Optional[str] = None
    category: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CourseCreate(BaseModel):
    title: str
    description: str
    level: str
    image_url: Optional[str] = None
    category: str

class Lesson(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    course_id: str
    title: str
    content: str
    video_url: Optional[str] = None
    order: int
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LessonCreate(BaseModel):
    course_id: str
    title: str
    content: str
    video_url: Optional[str] = None
    order: int

class UserProgress(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    lesson_id: str
    completed: bool = False
    completed_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserProgressCreate(BaseModel):
    user_id: str
    lesson_id: str
    completed: bool = False
