import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 px-4">
      <div className="w-full max-w-md p-8 bg-stone-900 border border-stone-800">
        <h2 className="text-2xl font-serif text-center mb-8 text-stone-100">Lime Light Admin</h2>
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 text-sm mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Username</label>
            <input required type="text" className="w-full bg-stone-950 border border-stone-800 p-3 text-stone-100 focus:outline-none focus:border-amber-500" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Password</label>
            <input required type="password" className="w-full bg-stone-950 border border-stone-800 p-3 text-stone-100 focus:outline-none focus:border-amber-500" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full py-3 bg-amber-500 text-stone-950 uppercase tracking-widest text-sm font-semibold hover:bg-amber-400 transition-colors mt-4">
            Sign In
          </button>
        </form>
        <p className="text-stone-500 text-xs mt-6 text-center">Use admin / admin123 for preview</p>
      </div>
    </div>
  );
}
