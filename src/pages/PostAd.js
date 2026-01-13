import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/products";
import { addMyAd, getUser } from "../utils/storage";

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function PostAd() {
  const navigate = useNavigate();
  const user = useMemo(() => getUser(), []);
  const sellerName = user?.name || "Seller";

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "Mobiles",
    location: "",
    description: "",
    images: [],
  });

  const [previews, setPreviews] = useState([]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onFiles = async (e) => {
    const files = Array.from(e.target.files || []).slice(0, 6);
    const b64 = [];
    const pv = [];
    for (const file of files) {
      const base64 = await toBase64(file);
      b64.push(base64);
      pv.push(base64);
    }
    set("images", b64);
    setPreviews(pv);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price || !form.location.trim()) {
      alert("Please fill Title, Price, Location");
      return;
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const postedAt = `${yyyy}-${mm}-${dd}`;

    const product = {
      id: String(Date.now()),
      title: form.title.trim(),
      price: Number(form.price),
      category: form.category,
      location: form.location.trim(),
      postedAt,
      images: form.images.length ? form.images : ["https://placehold.co/900x600?text=Your+Ad"],
      description: form.description.trim() || "No description",
      seller: { name: sellerName, phone: "9XXXXXXXXX" },
      _mine: true,
    };

    addMyAd(product);
    navigate("/my-ads");
  };

  return (
    <div className="box">
      <h1 className="h1">Post an Ad</h1>

      <form className="form" onSubmit={submit}>
        <label className="label">Category</label>
        <select className="input" value={form.category} onChange={(e) => set("category", e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label className="label">Title *</label>
        <input className="input" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="eg: iPhone 13 256GB" />

        <label className="label">Price (₹) *</label>
        <input className="input" type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="eg: 25000" />

        <label className="label">Location *</label>
        <input className="input" value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="eg: Kochi" />

        <label className="label">Description</label>
        <textarea className="input" rows="4" value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Write details..." />

        <label className="label">Photos (max 6)</label>
        <input className="input" type="file" accept="image/*" multiple onChange={onFiles} />

        {previews.length > 0 && (
          <div className="preview-row">
            {previews.map((src, i) => (
              <img className="preview" key={i} src={src} alt={`preview-${i}`} />
            ))}
          </div>
        )}

        <button className="btn btn-primary mt16" type="submit">Post</button>
      </form>
    </div>
  );
}
