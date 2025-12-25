import Navbar from "../components/Navbar";
import { useState } from "react";
import { api } from "../services/api";
import Popup from "../components/Popup";

export default function SearchReportsPage() {
  const [filters, setFilters] = useState({ type: "", date: "" });
  const [results, setResults] = useState([]);
  const [popup, setPopup] = useState(null);

  const search = async () => {
    try {
      const params = {};
      if (filters.type) params.type = filters.type;
      if (filters.date) params.date = filters.date;

      const res = await api.get("/reports/filter", {
        headers: { Authorization: localStorage.getItem("token") },
        params,
      });

      setResults(res.data);

      setPopup({
        message:
          res.data.length > 0
            ? "Reports found"
            : "No reports match the criteria",
        type: res.data.length > 0 ? "success" : "error",
      });
    } catch {
      setPopup({ message: "Search failed", type: "error" });
    }
  };

  return (
    <>
      <Navbar />
      {popup && <Popup {...popup} onClose={() => setPopup(null)} />}

      <div className="page-center">
        <div className="card">
          <h3>Search Reports</h3>

          <input
            placeholder="Report Type"
            value={filters.type}
            onChange={(e) =>
              setFilters({ ...filters, type: e.target.value })
            }
          />
          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              setFilters({ ...filters, date: e.target.value })
            }
          />

          <button onClick={search}>Search</button>

          {results.map((r) => (
            <div key={r.id} className="report-item">
              <b>{r.type}</b>
              <br />
              Date: {r.date}
              <br />
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
      </div>
    </>
  );
}
