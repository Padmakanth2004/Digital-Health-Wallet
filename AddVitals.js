import { useState } from "react";
import { api } from "../services/api";
import Popup from "./Popup";

export default function AddVitals({ refresh }) {
  const [data, setData] = useState({});
  const [popup, setPopup] = useState(null);

  const submit = async () => {
    if (!data.date) {
      setPopup({ message: "Date is required", type: "error" });
      return;
    }

    try {
      await api.post("/vitals", data, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setPopup({ message: "Vitals saved successfully", type: "success" });
      if (refresh) refresh();
    } catch {
      setPopup({ message: "Failed to save vitals", type: "error" });
    }
  };

  return (
    <>
      {popup && (
        <Popup {...popup} onClose={() => setPopup(null)} />
      )}

      <div className="card">
        <h3 style={{ textAlign: "center" }}>Add Vitals</h3>

        <input
          placeholder="Blood Pressure (120/80)"
          onChange={(e) => setData({ ...data, bp: e.target.value })}
        />
        <input
          placeholder="Sugar Level"
          onChange={(e) => setData({ ...data, sugar: e.target.value })}
        />
        <input
          placeholder="Heart Rate"
          onChange={(e) => setData({ ...data, heart_rate: e.target.value })}
        />
        <input
          type="date"
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />

        <button onClick={submit}>Save Vitals</button>
      </div>
    </>
  );
}
