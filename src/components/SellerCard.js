export default function SellerCard({ seller }) {
  if (!seller) return null;
  return (
    <div className="seller">
      <h3>Seller</h3>
      <div className="seller-row">
        <div className="avatar">{seller.name?.[0]?.toUpperCase() || "S"}</div>
        <div>
          <div className="seller-name">{seller.name}</div>
          <div className="seller-phone">{seller.phone}</div>
        </div>
      </div>
      <button className="btn btn-primary w100">Chat  </button>
      <button className="btn btn-outline w100 mt8">Call </button>
    </div>
  );
}
