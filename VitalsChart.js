import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { api } from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function VitalsChart() {
  const [vitals, setVitals] = useState([]);

  useEffect(() => {
    api.get("/vitals", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then(res => setVitals(res.data));
  }, []);

  const data = {
    labels: vitals.map(v => v.date),
    datasets: [
      {
        label: "Sugar Level",
        data: vitals.map(v => v.sugar),
        borderColor: "#4facfe",
      },
      {
        label: "Heart Rate",
        data: vitals.map(v => v.heart_rate),
        borderColor: "#ff6b6b",
      },
    ],
  };

  return (
    <div className="card">
      <h3>Vitals Trend</h3>
      <Line data={data} />
    </div>
  );
}
