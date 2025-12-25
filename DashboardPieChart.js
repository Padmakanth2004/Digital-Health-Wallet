import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { api } from "../services/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPieChart() {
  const [stats, setStats] = useState({ reports: 0, vitals: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");

    Promise.all([
      api.get("/reports", { headers: { Authorization: token } }),
      api.get("/vitals", { headers: { Authorization: token } }),
    ]).then(([r, v]) =>
      setStats({ reports: r.data.length, vitals: v.data.length })
    );
  }, []);

  return (
    <div className="card">
      <h3>Health Summary</h3>
      <Pie
        data={{
          labels: ["Reports", "Vitals Entries"],
          datasets: [
            {
              data: [stats.reports, stats.vitals],
              backgroundColor: ["#4facfe", "#ff6b6b"],
            },
          ],
        }}
        options={{ animation: { duration: 1500 } }}
      />
    </div>
  );
}
