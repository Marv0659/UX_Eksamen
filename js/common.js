import { clearAllCookies } from "./cookieUtils.js";

export const BASE_URL = "http://localhost:8080";

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
export const loggedUserID = () => {
  return sessionStorage.getItem("food_repo_user_id") || 0;
};

window.addEventListener("resize", checkHeader)

function checkHeader(){

try {
  const burgerToggle = document.querySelector(".burgertoggle")
  if (!burgerToggle) {
    throw new Error("Burger toggle button not found")
  }

      if(getCookie("role") == "user"){
        document.querySelector(".login").textContent = "Profile"
        document.querySelector(".login").href = "user-profile.html"
        document.querySelector(".burger_login").textContent = "Profile"
        document.querySelector(".burger_login").href = "user-profile.html"

        document.querySelector(".signup").textContent = "Logout"
        document.querySelector(".signup").addEventListener("click", () =>{
          clearAllCookies()
        })
        document.querySelector(".burger_signup").textContent = "Logout"
        document.querySelector(".burger_signup").addEventListener("click", () =>{
          clearAllCookies()
        })
      } else if(getCookie("role") == "admin"){
        document.querySelector(".login").textContent = "Dashboard"
        document.querySelector(".login").href = "admin.html"
        document.querySelector(".burger_login").textContent = "Dashboard"
        document.querySelector(".burger_login").href = "admin.html"

        document.querySelector(".signup").textContent = "Logout"
        document.querySelector(".signup").addEventListener("click", () =>{
          clearAllCookies()
        })
        document.querySelector(".burger_signup").textContent = "Logout"
        document.querySelector(".burger_signup").addEventListener("click", () =>{
          clearAllCookies()
        })
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

export function showToast(message, duration = 3000) {
  const toast = document.createElement("div");
  toast.setAttribute("class", "toast");
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "1";
  }, 100);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}
}

checkHeader()