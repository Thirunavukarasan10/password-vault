// API client helper for frontend -> Next.js API routes
// Attaches JWT from localStorage and provides typed helper functions

const API_BASE = "/api";

export function getToken() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem("pv_token");
  } catch {
    return null;
  }
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      window.localStorage.setItem("pv_token", token);
    } else {
      window.localStorage.removeItem("pv_token");
    }
  } catch {
    // ignore
  }
}

export function getStoredTheme() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem("pv_theme");
  } catch {
    return null;
  }
}

export function setStoredTheme(theme) {
  if (typeof window === "undefined") return;
  try {
    if (theme) {
      window.localStorage.setItem("pv_theme", theme);
    } else {
      window.localStorage.removeItem("pv_theme");
    }
  } catch {
    // ignore
  }
}

async function apiFetch(path, { method = "GET", body, headers = {}, requireAuth = true } = {}) {
  const url = path.startsWith("/") ? `${API_BASE}${path}` : `${API_BASE}/${path}`;

  const finalHeaders = { ...headers };
  if (body && !(body instanceof FormData)) {
    finalHeaders["Content-Type"] = finalHeaders["Content-Type"] || "application/json";
  }

  const token = getToken();
  if (requireAuth && token) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();

  if (!res.ok) {
    const error = new Error(typeof data === "string" ? data : data?.error || "Request failed");
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const api = {
  async register({ name, email, password }) {
    return apiFetch("/register", { method: "POST", body: { name, email, password }, requireAuth: false });
  },
  async login({ email, password }) {
    return apiFetch("/login", { method: "POST", body: { email, password }, requireAuth: false });
  },
  async listPasswords() {
    return apiFetch("/passwords", { method: "GET" });
  },
  async createPassword({ serviceName, username, password }) {
    return apiFetch("/passwords", { method: "POST", body: { serviceName, username, password } });
  },
  async updatePassword({ id, serviceName, username, password }) {
    return apiFetch("/passwords", { method: "PUT", body: { id, serviceName, username, password } });
  },
  async deletePassword(id) {
    const url = `/passwords?id=${encodeURIComponent(id)}`;
    return apiFetch(url, { method: "DELETE" });
  },
};

export function decodeJwtPayload(token) {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
