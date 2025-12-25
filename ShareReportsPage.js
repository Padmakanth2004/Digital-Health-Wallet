import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Popup from "../components/Popup";

export default function ShareReportsPage() {
  const [reports, setReports] = useState([]);
  const [data, setData] = useState({ report_id: "", email: "" });
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    api.get("/reports", {
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => setReports(res.data));
  }, []);

  const share = async () => {
    if (!data.report_id || !data.email) {
      setPopup({ message: "Select report and enter email", type: "error" });
      return;
    }

    try {
      await api.post("/share", data, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setPopup({
        message: "Report shared successfully (read-only)",
        type: "success",
      });
    } catch {
      setPopup({ message: "Failed to share report", type: "error" });
    }
  };

  return (
    <>
      <Navbar />
      {popup && <Popup {...popup} onClose={() => setPopup(null)} />}

      <div className="page-center">
        <div className="card">
          <h3>Share Medical Report</h3>

          <select
            onChange={(e) =>
              setData({ ...data, report_id: e.target.value })
            }
          >
            <option value="">Select Report</option>
            {reports.map((r) => (
              <option key={r.id} value={r.id}>
                {r.type} ({r.date})
              </option>
            ))}
          </select>

          <input
            placeholder="Doctor / Family Email"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <button onClick={share}>Share (Read-only)</button>
        </div>
      </div>
    </>
  );
}
