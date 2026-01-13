import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import SellerCard from "../components/SellerCard";
import useProducts from "../hooks/useProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const allProducts = useProducts();

  const product = useMemo(() => {
    return allProducts.find((p) => String(p.id) === String(id));
  }, [allProducts, id]);

  if (!product) {
    return (
      <div className="empty">
        Product not found. <Link to="/search" className="link">Go to search</Link>
      </div>
    );
  }

  return (
    <div className="details">
      <div className="details-left">
        <ImageGallery images={product.images} />
        <div className="box mt16">
          <h2 className="h2">Description</h2>
          <p className="para">{product.description}</p>
        </div>
      </div>

      <div className="details-right">
        <div className="box">
          <div className="price big">₹ {Number(product.price).toLocaleString("en-IN")}</div>
          <div className="title big">{product.title}</div>
          <div className="meta">
            <span>{product.location}</span>
            <span>•</span>
            <span>{product.postedAt}</span>
            <span>•</span>
            <span>{product.category}</span>
          </div>
        </div>

        <SellerCard seller={product.seller} />
      </div>
    </div>
  );
}
