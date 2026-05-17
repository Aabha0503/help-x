import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";
import LoginPage from "./features/auth/LoginPage.jsx";
import DashboardPage from "./features/dashboard/DashboardPage.jsx";
import ActiveAlertsPage from "./features/incidents/ActiveAlertsPage.jsx";
import VehicleMonitoringPage from "./features/vehicles/VehicleMonitoringPage.jsx";
import GpsTrackingPage from "./features/map/GpsTrackingPage.jsx";
import HospitalNotificationPage from "./features/notifications/HospitalNotificationPage.jsx";
import PoliceDispatchPage from "./features/dispatch/PoliceDispatchPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/alerts" element={<ActiveAlertsPage />} />
        <Route path="/vehicles" element={<VehicleMonitoringPage />} />
        <Route path="/gps" element={<GpsTrackingPage />} />
        <Route path="/hospitals" element={<HospitalNotificationPage />} />
        <Route path="/police" element={<PoliceDispatchPage />} />
      </Route>
    </Routes>
  );
}
