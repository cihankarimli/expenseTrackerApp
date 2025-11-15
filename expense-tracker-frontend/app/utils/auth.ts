// ...existing code...
"use client";

export const setToken = (token: string) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    // Try to read response body (json or text) for better error
    let body: any = null;
    try {
      body = await res.json();
    } catch {
      try {
        body = await res.text();
      } catch {
        body = null;
      }
    }
    const msg =
      (body && body.message) ||
      (typeof body === "string" ? body : null) ||
      `Request failed with status ${res.status}`;
    const err: any = new Error(msg);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return res.json();
};
// ...existing code...