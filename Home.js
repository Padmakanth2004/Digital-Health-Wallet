import Navbar from "../components/Navbar";
import DashboardPieChart from "../components/DashboardPieChart";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Home() {
  const [stats, setStats] = useState({ reports: 0, vitals: 0, last: "-" });

  useEffect(() => {
    const token = localStorage.getItem("token");

    api.get("/reports", { headers: { Authorization: token } })
      .then(res => setStats(s => ({
        ...s,
        reports: res.data.length,
        last: res.data.length ? res.data.at(-1).date : "-"
      })));

    api.get("/vitals", { headers: { Authorization: token } })
      .then(res => setStats(s => ({ ...s, vitals: res.data.length })));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container dashboard-grid">
        <div className="stat-card">📄 Reports<b>{stats.reports}</b></div>
        <div className="stat-card">❤️ Vitals<b>{stats.vitals}</b></div>
        <div className="stat-card">📅 Last Upload<b>{stats.last}</b></div>
        <DashboardPieChart />
      </div>
    </>
  );
}
