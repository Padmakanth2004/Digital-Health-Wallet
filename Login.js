import { useState } from "react";
import { api } from "../services/api";
import Popup from "../components/Popup";

export default function Login({ navigate }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [popup, setPopup] = useState(null);

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);

      setPopup({
        message: "Login successful! Redirecting to dashboard...",
        type: "success",
      });

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      setPopup({
        message: "Invalid email or password",
        type: "error",
      });
    }
  };

  return (
    <>
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}

      <div className="page-center">
        <div className="card">
          <h2 style={{ textAlign: "center" }}>Login</h2>

          <input
            placeholder="Email"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <button onClick={submit}>Login</button>

          <p style={{ textAlign: "center", marginTop: "12px" }}>
            Not registered?{" "}
            <span
              style={{
                color: "#4facfe",
                cursor: "pointer",
                fontWeight: "500",
              }}
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
