const K_FAV = "olx_favorites";
const K_MYADS = "olx_my_ads";
const K_USER = "olx_user";

function emit(name) {
  window.dispatchEvent(new Event(name));
}

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* Favorites */
export function getFavorites() {
  return readJSON(K_FAV, []);
}

export function isFavorite(id) {
  return getFavorites().includes(String(id));
}

export function toggleFavorite(id) {
  const fav = getFavorites();
  const sid = String(id);
  const updated = fav.includes(sid) ? fav.filter((x) => x !== sid) : [sid, ...fav];
  writeJSON(K_FAV, updated);
  emit("olx:fav-changed");
  return updated;
}

/* My Ads */
export function getMyAds() {
  return readJSON(K_MYADS, []);
}

export function addMyAd(product) {
  const ads = getMyAds();
  writeJSON(K_MYADS, [product, ...ads]);
  emit("olx:myads-changed");
}

export function removeMyAd(id) {
  const ads = getMyAds();
  writeJSON(K_MYADS, ads.filter((a) => String(a.id) !== String(id)));
  emit("olx:myads-changed");
}

/* User (mock) */
export function getUser() {
  return readJSON(K_USER, null);
}

export function setUser(user) {
  writeJSON(K_USER, user);
  emit("olx:user-changed");
}

export function logout() {
  localStorage.removeItem(K_USER);
  emit("olx:user-changed");
}
