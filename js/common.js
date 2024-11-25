export const BASE_URL = "http://localhost:8080";

export const loggedUserID = () => {
  return sessionStorage.getItem("food_repo_user_id") || 0;
};

document.querySelector(".burgertoggle").addEventListener("click", () =>{
  document.querySelector(".burgernav").classList.toggle("active")
  document.querySelector(".burger").classList.toggle("hidden")
  document.querySelector(".cross").classList.toggle("hidden")
})