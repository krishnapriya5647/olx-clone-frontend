import { CATEGORIES } from "../data/products";

export default function FiltersSidebar({ filters, setFilters, onClear }) {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <div className="filters">
      <h3>Filters</h3>

      <label className="label">Category</label>
      <select
        className="input"
        value={filters.cat}
        onChange={(e) => update("cat", e.target.value)}
      >
        <option value="">All</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <label className="label">Location</label>
      <input
        className="input"
        placeholder="eg: Kochi"
        value={filters.loc}
        onChange={(e) => update("loc", e.target.value)}
      />

      <label className="label">Price range (₹)</label>
      <div className="row">
        <input
          className="input"
          type="number"
          placeholder="Min"
          value={filters.min}
          onChange={(e) => update("min", e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Max"
          value={filters.max}
          onChange={(e) => update("max", e.target.value)}
        />
      </div>

      <label className="label">Sort</label>
      <select
        className="input"
        value={filters.sort}
        onChange={(e) => update("sort", e.target.value)}
      >
        <option value="new">Newest</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>

      <div className="row mt">
        <button className="btn btn-outline" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
