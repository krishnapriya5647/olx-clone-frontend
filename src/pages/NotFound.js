import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="empty">
      Page not found. <Link to="/" className="link">Go Home</Link>
    </div>
  );
}
