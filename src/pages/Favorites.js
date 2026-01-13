import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import { getFavorites } from "../utils/storage";

export default function Favorites() {
  const allProducts = useProducts();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const rerender = () => setTick((t) => t + 1);
    window.addEventListener("olx:fav-changed", rerender);
    window.addEventListener("storage", rerender);
    return () => {
      window.removeEventListener("olx:fav-changed", rerender);
      window.removeEventListener("storage", rerender);
    };
  }, []);

  const favIds = useMemo(() => getFavorites(), [tick]);

  const products = useMemo(() => {
    return allProducts.filter((p) => favIds.includes(String(p.id)));
  }, [allProducts, favIds]);

  return (
    <div>
      <h1 className="h1">Favorites</h1>

      {products.length === 0 ? (
        <div className="empty">No favorites yet. Tap ❤️ on any item.</div>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
