import { useEffect, useMemo, useState } from "react";
import { emergencyAlerts } from "../data/mockData.js";

const simulatedAlerts = [
  {
    id: "HX-2049",
    driver: "Kabir Malhotra",
    vehicle: "GJ 01 RT 3342",
    severity: "critical",
    status: "Countdown active",
    location: "SG Highway, Ahmedabad",
    time: "Just now",
    confidence: 96,
    sensors: "Impact spike + airbag event"
  },
  {
    id: "HX-2050",
    driver: "Meera Joshi",
    vehicle: "TS 08 LL 9218",
    severity: "high",
    status: "AI verification",
    location: "Outer Ring Road, Hyderabad",
    time: "Just now",
    confidence: 84,
    sensors: "Sudden stop + tilt anomaly"
  }
];

export default function useLiveAlerts() {
  const [alerts, setAlerts] = useState(emergencyAlerts);
  const [latestAlert, setLatestAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 700);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    let cursor = 0;
    const interval = window.setInterval(() => {
      const nextAlert = simulatedAlerts[cursor % simulatedAlerts.length];
      setAlerts((current) => [nextAlert, ...current.filter((alert) => alert.id !== nextAlert.id)].slice(0, 5));
      setLatestAlert(nextAlert);
      cursor += 1;
    }, 9000);

    return () => window.clearInterval(interval);
  }, []);

  const analytics = useMemo(() => {
    const critical = alerts.filter((alert) => alert.severity === "critical").length;
    const averageConfidence = Math.round(alerts.reduce((total, alert) => total + alert.confidence, 0) / alerts.length);

    return {
      activeEmergencies: alerts.length,
      critical,
      averageConfidence,
      countdownActive: alerts.some((alert) => alert.status.toLowerCase().includes("countdown"))
    };
  }, [alerts]);

  return { alerts, latestAlert, analytics, isLoading };
}
