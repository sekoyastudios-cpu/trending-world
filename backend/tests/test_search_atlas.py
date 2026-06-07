"""Backend tests for The Search Atlas — trends, game, newsletter, sponsored, affiliates."""
import os
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else None
# Fall back: read from frontend/.env if not in env
if not BASE_URL:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                break

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------- Trends ----------
class TestTrends:
    def test_all_time_default_15(self, s):
        r = s.get(f"{API}/trends/all-time")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 15
        assert data[0]["term"] == "YouTube"
        assert data[0]["volume"] > 0
        assert "rank" in data[0]

    def test_all_time_limit(self, s):
        r = s.get(f"{API}/trends/all-time", params={"limit": 5})
        assert r.status_code == 200
        assert len(r.json()) == 5

    def test_all_time_limit_invalid(self, s):
        r = s.get(f"{API}/trends/all-time", params={"limit": 100})
        assert r.status_code == 422

    def test_trends_now_global_sorted(self, s):
        r = s.get(f"{API}/trends/now", params={"country": "GLOBAL"})
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        vols = [t["volume"] for t in data]
        assert vols == sorted(vols, reverse=True)
        assert all(t["country"] == "GLOBAL" for t in data)

    def test_trends_now_country_lowercase(self, s):
        r = s.get(f"{API}/trends/now", params={"country": "us"})
        assert r.status_code == 200
        data = r.json()
        assert all(t["country"] == "US" for t in data)

    def test_trends_now_category_filter(self, s):
        r = s.get(f"{API}/trends/now", params={"country": "GLOBAL", "category": "Tech"})
        assert r.status_code == 200
        assert all(t["category"] == "Tech" for t in r.json())

    def test_trends_now_unknown_country_404(self, s):
        r = s.get(f"{API}/trends/now", params={"country": "ZZ"})
        assert r.status_code == 404

    def test_ticker(self, s):
        r = s.get(f"{API}/trends/ticker")
        assert r.status_code == 200
        data = r.json()
        assert len(data) > 0
        assert all(t["country"] == "GLOBAL" for t in data)

    def test_countries(self, s):
        r = s.get(f"{API}/trends/countries")
        assert r.status_code == 200
        data = r.json()
        codes = [c["code"] for c in data]
        assert "GLOBAL" in codes
        assert "US" in codes
        assert all("code" in c and "name" in c for c in data)

    def test_categories(self, s):
        r = s.get(f"{API}/trends/categories")
        assert r.status_code == 200
        cats = r.json()
        assert cats[0] == "All"
        assert "Tech" in cats


# ---------- Game ----------
class TestGame:
    def test_game_pair(self, s):
        r = s.get(f"{API}/game/pair")
        assert r.status_code == 200
        data = r.json()
        assert "pair_id" in data
        assert data["left"]["id"] != data["right"]["id"]
        assert data["left"]["volume"] != data["right"]["volume"]

    def test_game_guess_correct(self, s):
        pair = s.get(f"{API}/game/pair").json()
        winner = "left" if pair["left"]["volume"] > pair["right"]["volume"] else "right"
        r = s.post(f"{API}/game/guess", json={
            "pair_id": pair["pair_id"],
            "pick": winner,
            "left_id": pair["left"]["id"],
            "right_id": pair["right"]["id"],
        })
        assert r.status_code == 200
        data = r.json()
        assert data["correct"] is True
        assert data["winner"] == winner

    def test_game_guess_wrong(self, s):
        pair = s.get(f"{API}/game/pair").json()
        wrong = "left" if pair["left"]["volume"] < pair["right"]["volume"] else "right"
        r = s.post(f"{API}/game/guess", json={
            "pair_id": pair["pair_id"],
            "pick": wrong,
            "left_id": pair["left"]["id"],
            "right_id": pair["right"]["id"],
        })
        assert r.status_code == 200
        assert r.json()["correct"] is False

    def test_game_guess_unknown_id(self, s):
        r = s.post(f"{API}/game/guess", json={
            "pair_id": "x", "pick": "left", "left_id": "nope", "right_id": "us-1",
        })
        assert r.status_code == 404


# ---------- Newsletter ----------
class TestNewsletter:
    def test_subscribe_and_idempotent(self, s):
        email = "TEST_subscriber@example.com"
        r1 = s.post(f"{API}/newsletter/subscribe", json={"email": email})
        assert r1.status_code == 200
        assert r1.json()["ok"] is True
        # Second call - should be idempotent
        r2 = s.post(f"{API}/newsletter/subscribe", json={"email": email})
        assert r2.status_code == 200
        # Verify only one record exists via direct mongo (best-effort: rely on no duplicate error)
        # Test passes if both 200 without error.

    def test_subscribe_invalid_email(self, s):
        r = s.post(f"{API}/newsletter/subscribe", json={"email": "not-an-email"})
        assert r.status_code == 422


# ---------- Content slots ----------
class TestContent:
    def test_sponsored(self, s):
        r = s.get(f"{API}/sponsored")
        assert r.status_code == 200
        d = r.json()
        assert "brand" in d and "url" in d and "image" in d

    def test_affiliates(self, s):
        r = s.get(f"{API}/affiliates")
        assert r.status_code == 200
        items = r.json()
        assert len(items) >= 1
        assert all("title" in i and "image" in i and "url" in i for i in items)
