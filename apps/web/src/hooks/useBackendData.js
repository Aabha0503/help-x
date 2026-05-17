import useApiResource from "./useApiResource";
import { fetchAlerts, fetchHospitals, fetchPoliceUnits, fetchVehicles } from "../services/helpXApi";

export const useAlerts = () => useApiResource(fetchAlerts);

export const useVehicles = () => useApiResource(fetchVehicles);

export const useHospitals = () => useApiResource(fetchHospitals);

export const usePoliceUnits = () => useApiResource(fetchPoliceUnits);
