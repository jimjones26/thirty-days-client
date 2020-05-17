const fetch = process.browser ? window.fetch : require("node-fetch").default;

export function post(endpoint, data) {
  return fetch(endpoint, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
}
