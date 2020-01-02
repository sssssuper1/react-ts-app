export async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(res.statusText);
  } else {
    return res.json();
  }
}