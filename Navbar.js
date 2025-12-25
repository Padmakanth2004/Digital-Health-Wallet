import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <h2>🩺 Digital Health Wallet</h2>

      <div className="nav-links">
        <Link to="/home">Dashboard</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/vitals">Vitals</Link>
        <Link to="/search">Search</Link>
        <Link to="/share">Share</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
