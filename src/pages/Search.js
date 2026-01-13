import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

const PAGE_SIZE = 8;

function normalize(s) {
  return String(s || "").trim().toLowerCase();
}

function buildSearchParams(filters, page) {
  const sp = new URLSearchParams();
  if (filters.q?.trim()) sp.set("q", filters.q.trim());
  if (filters.loc?.trim()) sp.set("loc", filters.loc.trim());
  if (filters.cat) sp.set("cat", filters.cat);
  if (filters.min) sp.set("min", filters.min);
  if (filters.max) sp.set("max", filters.max);
  if (filters.sort) sp.set("sort", filters.sort);
  sp.set("page", String(page));
  return sp;
}

export default function Search() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const allProducts = useProducts();

  const [filters, setFilters] = useState({
    q: params.get("q") || "",
    loc: params.get("loc") || "",
    cat: params.get("cat") || "",
    min: params.get("min") || "",
    max: params.get("max") || "",
    sort: params.get("sort") || "new",
  });

  const [page, setPage] = useState(Number(params.get("page") || "1"));

  // URL -> state (Back/Forward will update the sidebar inputs and page)
  useEffect(() => {
    setPage(Number(params.get("page") || "1"));
    setFilters({
      q: params.get("q") || "",
      loc: params.get("loc") || "",
      cat: params.get("cat") || "",
      min: params.get("min") || "",
      max: params.get("max") || "",
      sort: params.get("sort") || "new",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.toString()]);

  const pushParams = (nextPage = 1, nextFilters = filters, replace = false) => {
    const sp = buildSearchParams(nextFilters, nextPage);
    const qs = sp.toString();
    const url = qs ? `/search?${qs}` : "/search";

    const current = `${location.pathname}${location.search}`;
    if (current === url) return;

    navigate(url, { replace });
  };

  // Filters change -> update URL using replace (so Back does not need many clicks)
  useEffect(() => {
    const t = setTimeout(() => {
      pushParams(1, filters, true);
    }, 350); // small debounce for typing
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.q, filters.loc, filters.cat, filters.min, filters.max, filters.sort]);

  const filtered = useMemo(() => {
    const q = normalize(filters.q);
    const loc = normalize(filters.loc);
    const cat = filters.cat;
    const min = filters.min ? Number(filters.min) : null;
    const max = filters.max ? Number(filters.max) : null;

    let list = allProducts;

    if (q) {
      list = list.filter((p) => {
        const hay = `${p.title} ${p.description}`.toLowerCase();
        return hay.includes(q);
      });
    }
    if (loc) list = list.filter((p) => normalize(p.location).includes(loc));
    if (cat) list = list.filter((p) => p.category === cat);
    if (min !== null) list = list.filter((p) => Number(p.price) >= min);
    if (max !== null) list = list.filter((p) => Number(p.price) <= max);

    if (filters.sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    else if (filters.sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    else list = [...list].sort((a, b) => String(b.postedAt).localeCompare(String(a.postedAt)));

    return list;
  }, [allProducts, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const onClear = () => {
    setFilters({ q: "", loc: "", cat: "", min: "", max: "", sort: "new" });
    navigate("/search", { replace: true });
  };

  return (
    <div className="two-col-layout">
      <aside>
        <FiltersSidebar
          filters={{ ...filters, page: safePage }}
          setFilters={setFilters}
          onClear={onClear}
        />
      </aside>

      <section>
        <div className="search-header">
          <h2 className="h2">Results ({filtered.length})</h2>
          <div className="muted">
            Page {safePage} / {totalPages}
          </div>
        </div>

        <div className="grid">
          {paged.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {!filtered.length && <div className="empty">No results. Try different filters.</div>}

        {filtered.length > 0 && (
          <div className="pager">
            <button
              className="btn btn-outline"
              disabled={safePage <= 1}
              onClick={() => pushParams(safePage - 1, filters, false)}
            >
              Prev
            </button>
            <button
              className="btn btn-outline"
              disabled={safePage >= totalPages}
              onClick={() => pushParams(safePage + 1, filters, false)}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

