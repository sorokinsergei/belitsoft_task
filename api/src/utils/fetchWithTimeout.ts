export const fetchWithTimeout = async (url: URL | string, timeoutMs = 5000) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Fetch request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
};
