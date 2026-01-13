import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../utils/storage";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Enter name and email");
      return;
    }
    setUser({ name: name.trim(), email: email.trim() });
    navigate("/");
  };

  return (
    <div className="box auth">
      <h1 className="h1">Login (Mock)</h1>
      <p className="muted">This is frontend only. No real authentication.</p>

      <form className="form" onSubmit={submit}>
        <label className="label">Your Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="eg: Nayana" />

        <label className="label">Email</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="eg: you@email.com" />

        <button className="btn btn-primary mt16" type="submit">Login</button>
      </form>
    </div>
  );
}
