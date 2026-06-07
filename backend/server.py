"""The Search Atlas — Backend API
Seeded dataset of the most-searched things in the world, per-country trends,
categorized trends, a 'Higher / Lower' guess game, and a newsletter sink.
"""
from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import random
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="The Search Atlas")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class Trend(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    term: str
    volume: int  # monthly searches (estimated)
    category: str
    country: str  # "GLOBAL" or ISO-2 like "US", "IN"
    delta: float  # week-over-week change %
    rank: int


class GamePair(BaseModel):
    pair_id: str
    left: Trend
    right: Trend


class GuessRequest(BaseModel):
    pair_id: str
    pick: str  # 'left' or 'right'
    left_id: str
    right_id: str


class GuessResponse(BaseModel):
    correct: bool
    left_volume: int
    right_volume: int
    winner: str  # 'left' or 'right'


class NewsletterCreate(BaseModel):
    email: EmailStr


class Subscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------- Seed data ----------
CATEGORIES = ["People", "Places", "News", "Tech", "Sports", "Entertainment", "Food", "Brands"]

COUNTRIES = {
    "GLOBAL": "Global",
    "US": "United States",
    "IN": "India",
    "BR": "Brazil",
    "JP": "Japan",
    "DE": "Germany",
    "GB": "United Kingdom",
    "FR": "France",
    "NG": "Nigeria",
    "ID": "Indonesia",
    "MX": "Mexico",
    "KR": "South Korea",
}

# Top all-time most searched terms on Google (curated, monthly estimates in millions)
ALL_TIME = [
    ("YouTube", 1_240_000_000, "Tech"),
    ("Facebook", 980_000_000, "Tech"),
    ("Google", 760_000_000, "Tech"),
    ("Weather", 540_000_000, "News"),
    ("Translate", 420_000_000, "Tech"),
    ("Amazon", 410_000_000, "Brands"),
    ("Gmail", 320_000_000, "Tech"),
    ("WhatsApp Web", 290_000_000, "Tech"),
    ("News", 270_000_000, "News"),
    ("ChatGPT", 260_000_000, "Tech"),
    ("Instagram", 250_000_000, "Tech"),
    ("Wordle", 110_000_000, "Entertainment"),
    ("Maps", 95_000_000, "Places"),
    ("Netflix", 92_000_000, "Entertainment"),
    ("Wikipedia", 88_000_000, "News"),
]

# Trending now per country (term, volume, category)
TRENDING = {
    "GLOBAL": [
        ("ChatGPT", 86_400_000, "Tech"),
        ("Taylor Swift", 73_100_000, "People"),
        ("World Cup", 68_900_000, "Sports"),
        ("iPhone 17", 54_200_000, "Tech"),
        ("Stranger Things", 41_700_000, "Entertainment"),
        ("Bitcoin price", 39_800_000, "News"),
        ("Tokyo", 28_400_000, "Places"),
        ("Pasta recipe", 24_900_000, "Food"),
        ("Nike", 22_500_000, "Brands"),
        ("Election results", 21_300_000, "News"),
    ],
    "US": [
        ("Super Bowl", 48_200_000, "Sports"),
        ("Taylor Swift", 39_800_000, "People"),
        ("Election results", 31_400_000, "News"),
        ("NBA", 27_100_000, "Sports"),
        ("iPhone 17", 23_900_000, "Tech"),
        ("Thanksgiving recipes", 18_400_000, "Food"),
        ("Stranger Things", 16_700_000, "Entertainment"),
        ("New York weather", 14_200_000, "Places"),
        ("Tesla stock", 12_800_000, "News"),
        ("Wordle today", 11_400_000, "Entertainment"),
    ],
    "IN": [
        ("IPL", 92_400_000, "Sports"),
        ("Cricket score", 71_300_000, "Sports"),
        ("Bollywood", 33_200_000, "Entertainment"),
        ("Aadhaar", 28_600_000, "News"),
        ("Diwali recipes", 22_100_000, "Food"),
        ("UPI", 19_700_000, "Tech"),
        ("Goa", 17_400_000, "Places"),
        ("ChatGPT", 16_200_000, "Tech"),
        ("Modi", 14_800_000, "People"),
        ("Stock market", 12_300_000, "News"),
    ],
    "BR": [
        ("Futebol", 58_900_000, "Sports"),
        ("Globo", 26_400_000, "Entertainment"),
        ("Carnaval", 22_100_000, "Places"),
        ("Neymar", 19_800_000, "People"),
        ("PIX", 17_300_000, "Tech"),
        ("Receita Federal", 14_600_000, "News"),
        ("Feijoada", 11_200_000, "Food"),
        ("Bolsa Família", 9_800_000, "News"),
        ("Anitta", 8_400_000, "People"),
        ("Rio de Janeiro", 7_900_000, "Places"),
    ],
    "JP": [
        ("Anime", 41_300_000, "Entertainment"),
        ("Pokemon", 28_400_000, "Entertainment"),
        ("Sushi", 18_700_000, "Food"),
        ("Tokyo Olympics", 16_400_000, "Sports"),
        ("Shohei Ohtani", 14_200_000, "People"),
        ("Earthquake", 12_900_000, "News"),
        ("Mt. Fuji", 9_800_000, "Places"),
        ("Toyota", 8_600_000, "Brands"),
        ("Manga", 7_900_000, "Entertainment"),
        ("Ramen", 7_100_000, "Food"),
    ],
    "DE": [
        ("Bundesliga", 24_300_000, "Sports"),
        ("Wetter", 21_800_000, "News"),
        ("Oktoberfest", 14_200_000, "Places"),
        ("Tatort", 11_900_000, "Entertainment"),
        ("DB Navigator", 10_400_000, "Tech"),
        ("Bratwurst", 7_800_000, "Food"),
        ("Berlin", 7_100_000, "Places"),
        ("BMW", 6_400_000, "Brands"),
        ("Bundestag", 5_900_000, "News"),
        ("Schnitzel", 4_700_000, "Food"),
    ],
    "GB": [
        ("Premier League", 38_100_000, "Sports"),
        ("BBC News", 24_700_000, "News"),
        ("Wimbledon", 14_300_000, "Sports"),
        ("Royal Family", 12_800_000, "People"),
        ("London weather", 11_400_000, "Places"),
        ("Fish and chips", 7_600_000, "Food"),
        ("Bake Off", 6_900_000, "Entertainment"),
        ("Tesco", 6_200_000, "Brands"),
        ("Stranger Things", 5_400_000, "Entertainment"),
        ("ChatGPT", 4_800_000, "Tech"),
    ],
    "FR": [
        ("Ligue 1", 19_700_000, "Sports"),
        ("Météo", 17_300_000, "News"),
        ("Tour de France", 13_800_000, "Sports"),
        ("Paris", 11_200_000, "Places"),
        ("Baguette", 6_400_000, "Food"),
        ("Croissant", 5_800_000, "Food"),
        ("Macron", 5_300_000, "People"),
        ("Louvre", 4_900_000, "Places"),
        ("Renault", 4_200_000, "Brands"),
        ("Cannes", 3_700_000, "Entertainment"),
    ],
    "NG": [
        ("Nollywood", 18_400_000, "Entertainment"),
        ("Burna Boy", 12_700_000, "People"),
        ("Jollof rice", 9_800_000, "Food"),
        ("Naira", 8_300_000, "News"),
        ("Lagos", 7_100_000, "Places"),
        ("Davido", 6_400_000, "People"),
        ("Premier League", 5_900_000, "Sports"),
        ("WhatsApp", 5_200_000, "Tech"),
        ("Tinubu", 4_700_000, "People"),
        ("Afrobeats", 4_100_000, "Entertainment"),
    ],
    "ID": [
        ("Sepak bola", 22_400_000, "Sports"),
        ("Bali", 17_300_000, "Places"),
        ("Rendang", 11_200_000, "Food"),
        ("Jokowi", 9_800_000, "People"),
        ("Gojek", 8_400_000, "Tech"),
        ("Nasi goreng", 7_100_000, "Food"),
        ("BPJS", 6_400_000, "News"),
        ("Jakarta", 5_800_000, "Places"),
        ("Rupiah", 4_900_000, "News"),
        ("BTS", 4_300_000, "People"),
    ],
    "MX": [
        ("Fútbol", 28_700_000, "Sports"),
        ("Tacos", 14_300_000, "Food"),
        ("Chivas", 11_800_000, "Sports"),
        ("Bad Bunny", 9_400_000, "People"),
        ("Cancún", 8_200_000, "Places"),
        ("Día de Muertos", 7_100_000, "Places"),
        ("Peso", 6_400_000, "News"),
        ("Selena", 5_700_000, "People"),
        ("Frida Kahlo", 4_900_000, "People"),
        ("AMLO", 4_300_000, "People"),
    ],
    "KR": [
        ("BTS", 41_200_000, "People"),
        ("BLACKPINK", 33_400_000, "People"),
        ("K-Drama", 27_800_000, "Entertainment"),
        ("Kimchi", 14_300_000, "Food"),
        ("Samsung", 12_700_000, "Brands"),
        ("Seoul", 11_400_000, "Places"),
        ("Squid Game", 9_800_000, "Entertainment"),
        ("KakaoTalk", 8_600_000, "Tech"),
        ("Bibimbap", 6_700_000, "Food"),
        ("Son Heung-min", 5_900_000, "People"),
    ],
}


def _seeded_trends() -> List[Trend]:
    rng = random.Random(7)
    out: List[Trend] = []
    for rank, (term, vol, cat) in enumerate(ALL_TIME, start=1):
        out.append(Trend(
            id=f"all-{rank}",
            term=term,
            volume=vol,
            category=cat,
            country="GLOBAL",
            delta=round(rng.uniform(-8, 22), 1),
            rank=rank,
        ))
    for country, items in TRENDING.items():
        for rank, (term, vol, cat) in enumerate(items, start=1):
            out.append(Trend(
                id=f"{country.lower()}-{rank}",
                term=term,
                volume=vol,
                category=cat,
                country=country,
                delta=round(rng.uniform(-15, 60), 1),
                rank=rank,
            ))
    return out


TRENDS_DB: List[Trend] = _seeded_trends()


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"service": "The Search Atlas", "status": "ok"}


@api_router.get("/trends/all-time", response_model=List[Trend])
async def all_time_trends(limit: int = Query(15, ge=1, le=50)):
    items = [t for t in TRENDS_DB if t.id.startswith("all-")]
    return items[:limit]


@api_router.get("/trends/now", response_model=List[Trend])
async def trends_now(
    country: str = Query("GLOBAL"),
    category: Optional[str] = None,
    limit: int = Query(10, ge=1, le=25),
):
    country = country.upper()
    if country not in COUNTRIES:
        raise HTTPException(status_code=404, detail="Unknown country code")
    items = [t for t in TRENDS_DB if t.country == country and not t.id.startswith("all-")]
    if category and category != "All":
        items = [t for t in items if t.category == category]
    items = sorted(items, key=lambda x: x.volume, reverse=True)
    return items[:limit]


@api_router.get("/trends/ticker", response_model=List[Trend])
async def trends_ticker():
    items = [t for t in TRENDS_DB if t.country == "GLOBAL" and not t.id.startswith("all-")]
    return items


@api_router.get("/trends/countries")
async def list_countries():
    return [{"code": code, "name": name} for code, name in COUNTRIES.items()]


@api_router.get("/trends/categories")
async def list_categories():
    return ["All"] + CATEGORIES


@api_router.get("/game/pair", response_model=GamePair)
async def game_pair():
    pool = [t for t in TRENDS_DB if not t.id.startswith("all-")]
    left, right = random.sample(pool, 2)
    # ensure different volumes for a clean winner
    while left.volume == right.volume:
        right = random.choice(pool)
    pair_id = str(uuid.uuid4())
    return GamePair(pair_id=pair_id, left=left, right=right)


@api_router.post("/game/guess", response_model=GuessResponse)
async def game_guess(req: GuessRequest):
    left = next((t for t in TRENDS_DB if t.id == req.left_id), None)
    right = next((t for t in TRENDS_DB if t.id == req.right_id), None)
    if not left or not right:
        raise HTTPException(status_code=404, detail="Unknown trend id")
    winner = "left" if left.volume > right.volume else "right"
    return GuessResponse(
        correct=(req.pick == winner),
        left_volume=left.volume,
        right_volume=right.volume,
        winner=winner,
    )


@api_router.post("/newsletter/subscribe")
async def newsletter_subscribe(payload: NewsletterCreate):
    sub = Subscriber(email=payload.email)
    await db.subscribers.update_one(
        {"email": sub.email},
        {"$setOnInsert": sub.model_dump()},
        upsert=True,
    )
    return {"ok": True, "email": sub.email}


@api_router.get("/sponsored")
async def sponsored_slot():
    return {
        "brand": "Nike",
        "tagline": "Just Search It.",
        "url": "https://nike.com",
        "image": "https://images.pexels.com/photos/8176112/pexels-photo-8176112.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "label": "Sponsored Trend",
    }


@api_router.get("/affiliates")
async def affiliates():
    return [
        {
            "id": "aff-1",
            "title": "iPhone 17",
            "subtitle": "The most-searched phone of the year",
            "image": "https://images.pexels.com/photos/30639091/pexels-photo-30639091.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "price": "$1,099",
            "url": "https://example.com/iphone-17",
        },
        {
            "id": "aff-2",
            "title": "Tokyo: City Guide",
            "subtitle": "Trending destination in Asia",
            "image": "https://images.pexels.com/photos/37126955/pexels-photo-37126955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "price": "$24",
            "url": "https://example.com/tokyo-guide",
        },
        {
            "id": "aff-3",
            "title": "Taylor Swift: The Eras Tour",
            "subtitle": "Most-searched person of the decade",
            "image": "https://images.pexels.com/photos/17718209/pexels-photo-17718209.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "price": "$199",
            "url": "https://example.com/eras-tour",
        },
    ]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
