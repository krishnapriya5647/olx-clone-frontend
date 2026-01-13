import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaPlusCircle } from "react-icons/fa";
import { getUser, logout } from "../utils/storage";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [user, setUserState] = useState(getUser());

  // ✅ Sync navbar inputs with URL params every time URL changes
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    setQ(sp.get("q") || "");
    setLoc(sp.get("loc") || "");
  }, [location.search]);

  // (optional) keep user UI updated
  useEffect(() => {
    const t = setInterval(() => setUserState(getUser()), 500);
    return () => clearInterval(t);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();

    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (loc.trim()) sp.set("loc", loc.trim());

    // ✅ If both empty, go to /search (this will clear the bar too)
    const qs = sp.toString();
    navigate(qs ? `/search?${qs}` : "/search");
  };

  const doLogout = () => {
    logout();
    setUserState(null);
    navigate("/");
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          OLX<span>Lite</span>
        </Link>

        <form className="nav-search" onSubmit={onSearch}>
          <input
            className="input"
            placeholder="Location (eg: Kochi)"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
          />
          <input
            className="input"
            placeholder="Search products (eg: iPhone, bike...)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>

        <div className="nav-actions">
          <Link to="/favorites" className="icon-btn" title="Favorites">
            <FaHeart />
          </Link>

          <Link to="/post" className="btn btn-outline">
            <FaPlusCircle style={{ marginRight: 8 }} />
            Sell
          </Link>

          {user ? (
            <div className="userbox">
              <span className="user-name">Hi, {user.name}</span>
              <Link to="/my-ads" className="link">My Ads</Link>
              <button className="link danger" onClick={doLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="link">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
