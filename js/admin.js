import { getCookie } from "./common.js";

if(getCookie("role")){
if (getCookie("role") !== "admin") {
  alert("You are not authorized to view this page.");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 0); 
}
}
else{
  alert("You are not authorized to view this page.");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 0); 
}
