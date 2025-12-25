import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportsPage from "./pages/ReportsPage";
import VitalsPage from "./pages/VitalsPage";
import SearchReportsPage from "./pages/SearchReportsPage";
import ShareReportsPage from "./pages/ShareReportsPage";

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Login navigate={navigate} />} />
      <Route path="/login" element={<Login navigate={navigate} />} />
      <Route path="/register" element={<Register navigate={navigate} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/vitals" element={<VitalsPage />} />
      <Route path="/search" element={<SearchReportsPage />} />
      <Route path="/share" element={<ShareReportsPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
