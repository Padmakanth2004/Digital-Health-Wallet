import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function ReportsList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get("/reports", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then(res => setReports(res.data));
  }, []);

  return (
    <div className="card">
      <h3>Your Reports</h3>
      {reports.map(r => (
        <div key={r.id} className="report-item">
          <p><b>Type:</b> {r.type}</p>
          <p><b>Date:</b> {r.date}</p>
          <a
            href={`http://localhost:5000/${r.file_path}`}
            target="_blank"
            rel="noreferrer"
          >
            View / Download
          </a>
        </div>
      ))}
    </div>
  );
}
