// Set a cookie with an optional expiration (in days)
export function setCookie(name, value, days = 1) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Get a cookie by its name
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// Delete a cookie by its name
export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Clear all cookies
export function clearAllCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    deleteCookie(name);
  });
}
