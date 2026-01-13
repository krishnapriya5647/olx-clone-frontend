import { useEffect, useMemo, useState } from "react";
import { BASE_PRODUCTS } from "../data/products";
import { getMyAds } from "../utils/storage";

function mergeProducts(base, mine) {
  const map = new Map();
  // My Ads should override base if id matches
  for (const p of base) map.set(String(p.id), p);
  for (const p of mine) map.set(String(p.id), p);
  return Array.from(map.values());
}

export default function useProducts() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const rerender = () => setTick((t) => t + 1);

    window.addEventListener("olx:myads-changed", rerender);

    // When localStorage changes in another tab
    window.addEventListener("storage", rerender);

    return () => {
      window.removeEventListener("olx:myads-changed", rerender);
      window.removeEventListener("storage", rerender);
    };
  }, []);

  const products = useMemo(() => {
    const mine = getMyAds();
    return mergeProducts(BASE_PRODUCTS, mine);
  }, [tick]);

  return products;
}
