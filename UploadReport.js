import { useState } from "react";
import { api } from "../services/api";
import Popup from "./Popup";

export default function UploadReport({ refresh }) {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [popup, setPopup] = useState(null);

  const submit = async () => {
    if (!file || !data.type || !data.date) {
      setPopup({ message: "All fields are required", type: "error" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("report", file);
      formData.append("type", data.type);
      formData.append("date", data.date);
      formData.append("vitals", data.vitals || "");

      await api.post("/reports", formData, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setPopup({
        message: "Medical report uploaded successfully",
        type: "success",
      });

      if (refresh) refresh();
    } catch {
      setPopup({ message: "Upload failed", type: "error" });
    }
  };

  return (
    <>
      {popup && (
        <Popup {...popup} onClose={() => setPopup(null)} />
      )}

      <div className="card">
        <h3 style={{ textAlign: "center" }}>Upload Medical Report</h3>

        <input
          placeholder="Report Type"
          onChange={(e) => setData({ ...data, type: e.target.value })}
        />
        <input
          type="date"
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />
        <input
          placeholder="Vitals (BP / Sugar / etc)"
          onChange={(e) => setData({ ...data, vitals: e.target.value })}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button onClick={submit}>Upload</button>
      </div>
    </>
  );
}
