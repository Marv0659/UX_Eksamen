export const BASE_URL = "http://localhost:8080";

export const loggedUserID = () => {
  return sessionStorage.getItem("food_repo_user_id") || 0;
};
