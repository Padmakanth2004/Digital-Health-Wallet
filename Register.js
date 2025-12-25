import { useState } from "react";
import { api } from "../services/api";
import Popup from "../components/Popup";

export default function Register({ navigate }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [popup, setPopup] = useState(null);

  const submit = async () => {
    try {
      await api.post("/auth/register", data);

      setPopup({
        message: "Registration successful! Please login.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setPopup({
        message: "Registration failed. Email may already exist.",
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
          <h2 style={{ textAlign: "center" }}>Register</h2>

          <input
            placeholder="Name"
            value={data.name}
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />

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

          <button onClick={submit}>Register</button>

          <p style={{ textAlign: "center", marginTop: "12px" }}>
            Already have an account?{" "}
            <span
              style={{
                color: "#4facfe",
                cursor: "pointer",
                fontWeight: "500",
              }}
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
