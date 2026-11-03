const apiBaseUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export function apiUrl(path: string): string {
  return `${apiBaseUrl}/${path.replace(/^\//, '')}`;
}
