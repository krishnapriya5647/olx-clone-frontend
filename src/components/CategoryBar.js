import { CATEGORIES } from "../data/products";

export default function CategoryBar({ active, onSelect }) {
  return (
    <div className="categorybar">
      <button
        className={`chip ${!active ? "active" : ""}`}
        onClick={() => onSelect("")}
      >
        All
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c}
          className={`chip ${active === c ? "active" : ""}`}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
