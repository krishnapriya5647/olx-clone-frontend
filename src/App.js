import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import PostAd from "./pages/PostAd";
import Login from "./pages/Login";
import MyAds from "./pages/MyAds";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/post" element={<PostAd />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-ads" element={<MyAds />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
