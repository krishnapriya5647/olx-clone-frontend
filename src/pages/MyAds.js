import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyAds, removeMyAd } from "../utils/storage";

export default function MyAds() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    setAds(getMyAds());
  }, []);

  const del = (id) => {
    if (!window.confirm("Delete this ad?")) return;
    removeMyAd(id);
    setAds(getMyAds());
  };

  return (
    <div>
      <div className="search-header">
        <h1 className="h1">My Ads</h1>
        <Link className="btn btn-primary" to="/post">Post new</Link>
      </div>

      {ads.length === 0 ? (
        <div className="empty">
          No ads yet. <Link to="/post" className="link">Post one</Link>
        </div>
      ) : (
        <div className="grid">
          {ads.map((p) => (
            <div key={p.id} className="card">
              <Link to={`/product/${p.id}`} className="card-img">
                <img src={p.images?.[0]} alt={p.title} />
              </Link>
              <div className="card-body">
                <div className="price">₹ {Number(p.price).toLocaleString("en-IN")}</div>
                <div className="title">{p.title}</div>
                <div className="meta">
                  <span>{p.location}</span><span>•</span><span>{p.postedAt}</span>
                </div>

                <button className="btn btn-outline mt8" onClick={() => del(p.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
