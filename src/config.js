const DEFAULT_API = "https://atlas-homes-api-gxdqfjc2btc0atbv.centralus-01.azurewebsites.net";
export const API_BASE_URL =
  (import.meta.env?.VITE_API_BASE_URL ?? import.meta.env?.VITE_API_BASE ?? "")
    .toString()
    .trim() || DEFAULT_API;
