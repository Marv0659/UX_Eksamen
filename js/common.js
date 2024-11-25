export const BASE_URL = "http://localhost:8080";

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
export const loggedUserID = () => {
  return sessionStorage.getItem("food_repo_user_id") || 0;
};

try {
  const burgerToggle = document.querySelector(".burgertoggle")
  if (!burgerToggle) {
    throw new Error("Burger toggle button not found")
  }

  burgerToggle.addEventListener("click", () => {
    try {
      const burgerNav = document.querySelector(".burgernav")
      const burger = document.querySelector(".burger")
      const cross = document.querySelector(".cross")

      if (!burgerNav || !burger || !cross) {
        throw new Error("Required navigation elements not found")
      }

      burgerNav.classList.toggle("active")
      burger.classList.toggle("hidden")
      cross.classList.toggle("hidden")
    } catch (error) {
      console.error("Error toggling navigation:", error.message)
      // You could add user feedback here, like:
      // alert("Sorry, there was a problem with the navigation menu")
    }
  })
} catch (error) {
  console.error("Error setting up burger menu:", error.message)
}