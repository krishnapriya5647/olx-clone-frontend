import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { isFavorite, toggleFavorite } from "../utils/storage";
import { useState } from "react";

export default function ProductCard({ p, onFavChange }) {
  const [fav, setFav] = useState(isFavorite(p.id));

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(p.id);
    const next = !fav;
    setFav(next);
    onFavChange?.(p.id, next);
  };

  return (
    <Link to={`/product/${p.id}`} className="card">
      <div className="card-img">
        <img src={p.images?.[0]} alt={p.title} />
        <button className="fav" onClick={toggle} title="Favorite">
          {fav ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <div className="card-body">
        <div className="price">₹ {Number(p.price).toLocaleString("en-IN")}</div>
        <div className="title" title={p.title}>{p.title}</div>
        <div className="meta">
          <span>{p.location}</span>
          <span>•</span>
          <span>{p.postedAt}</span>
        </div>
      </div>
    </Link>
  );
}
