import { useEffect, useMemo, useRef, useState } from "react";
import { fetchAlerts } from "../services/helpXApi";
import useApiResource from "./useApiResource";

export default function useLiveAlerts() {
  const alertsResource = useApiResource(fetchAlerts);
  const { data, retry } = alertsResource;
  const previousFirstId = useRef(null);
  const [latestAlert, setLatestAlert] = useState(null);

  // Lightweight live behavior: poll the backend periodically.
  // Later this can be replaced by Socket.IO without changing page components.
  useEffect(() => {
    const interval = window.setInterval(() => {
      retry();
    }, 10000);

    return () => window.clearInterval(interval);
  }, [retry]);

  useEffect(() => {
    const firstAlert = data[0];
    if (firstAlert && firstAlert.id !== previousFirstId.current) {
      previousFirstId.current = firstAlert.id;
      setLatestAlert(firstAlert);
    }
  }, [data]);

  const analytics = useMemo(() => {
    const alerts = data;
    const critical = alerts.filter((alert) => alert.severity === "critical").length;
    const averageConfidence = alerts.length
      ? Math.round(alerts.reduce((total, alert) => total + alert.confidence, 0) / alerts.length)
      : 0;

    return {
      activeEmergencies: alerts.length,
      critical,
      averageConfidence,
      countdownActive: alerts.some((alert) => alert.status.toLowerCase().includes("countdown"))
    };
  }, [data]);

  return {
    alerts: data,
    latestAlert,
    analytics,
    isLoading: alertsResource.isLoading,
    error: alertsResource.error,
    isEmpty: alertsResource.isEmpty,
    retry
  };
}
