import { useMemo, useState } from "react";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

export default function Home() {
  const [activeCat, setActiveCat] = useState("");
  const allProducts = useProducts();

  const products = useMemo(() => {
    const filtered = activeCat
      ? allProducts.filter((p) => p.category === activeCat)
      : allProducts;

    return [...filtered].sort((a, b) =>
      String(b.postedAt).localeCompare(String(a.postedAt))
    );
  }, [activeCat, allProducts]);

  return (
    <div>
      <h1 className="h1">Buy & Sell (Frontend only)</h1>
      <p className="muted">Categories</p>

      <CategoryBar active={activeCat} onSelect={setActiveCat} />

      <div className="section">
        <h2 className="h2">Fresh recommendations</h2>

        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {!products.length && <div className="empty">No items found.</div>}
      </div>
    </div>
  );
}
