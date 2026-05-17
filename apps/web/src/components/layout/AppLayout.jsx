import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NotificationCenter from "../common/NotificationCenter.jsx";
import Sidebar from "./Sidebar.jsx";
import TopNavbar from "./TopNavbar.jsx";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "startup",
      title: "Help-X monitoring active",
      message: "Live emergency simulation and dispatch telemetry are running."
    }
  ]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setNotifications((current) => [
        {
          id: "simulated-alert",
          title: "New high-risk accident candidate",
          message: "AI verification started for vehicle GJ 01 RT 3342."
        },
        ...current
      ]);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  const dismissNotification = (id) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
          <TopNavbar onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
      <NotificationCenter notifications={notifications} onDismiss={dismissNotification} />
    </div>
  );
}
