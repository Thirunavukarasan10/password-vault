// Small API helper that automatically adds the Authorization header
import { useAuth } from "../context/AuthContext";

export function useApi() {
  const { token } = useAuth();

  async function request(path, { method = "GET", body, headers = {} } = {}) {
    const res = await fetch(path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = data?.error || `Request failed with ${res.status}`;
      throw new Error(message);
    }
    return data;
  }

  return {
    get: (p) => request(p),
    post: (p, b) => request(p, { method: "POST", body: b }),
    put: (p, b) => request(p, { method: "PUT", body: b }),
    del: (p) => request(p, { method: "DELETE" }),
  };
}
