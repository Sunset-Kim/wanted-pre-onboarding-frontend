export default async function request<T>(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw response;
    }

    const result: T = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
