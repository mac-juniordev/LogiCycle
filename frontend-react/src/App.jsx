import { Routes, Route } from "react-router-dom";
import PublicReport from "./pages/PublicReport.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import DispatchPanel from "./pages/DispatchPanel.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC — the only route visible to citizens */}
      <Route path="/" element={<PublicReport />} />

      {/* HIDDEN OPERATIONAL ROUTES — never linked in public UI */}
      <Route path="/portal-x-management-alpha" element={<AdminPanel />} />
      <Route path="/node-fleet-driver-beta" element={<DispatchPanel />} />

      {/* 404 CATCHALL */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}