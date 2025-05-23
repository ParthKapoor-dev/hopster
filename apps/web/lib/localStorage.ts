export function setItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key: string) {
  return JSON.parse(localStorage.getItem(key) || "");
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}
