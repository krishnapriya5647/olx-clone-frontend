import { useState } from "react";

export default function ImageGallery({ images = [] }) {
  const [active, setActive] = useState(images[0] || "");
  if (!images.length) return <div className="gallery">No images</div>;

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={active} alt="product" />
      </div>
      <div className="gallery-thumbs">
        {images.map((src, i) => (
          <button
            key={i}
            className={`thumb ${active === src ? "active" : ""}`}
            onClick={() => setActive(src)}
          >
            <img src={src} alt={`thumb-${i}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
