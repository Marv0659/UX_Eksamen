export const BASE_URL = "http://localhost:8080";

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
export const loggedUserID = () => {
  return sessionStorage.getItem("food_repo_user_id") || 0;
};

document.querySelector(".burgertoggle").addEventListener("click", () =>{
  document.querySelector(".burgernav").classList.toggle("active")
  document.querySelector(".burger").classList.toggle("hidden")
  document.querySelector(".cross").classList.toggle("hidden")
})
