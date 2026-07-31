import api from "./axios";

export const loginRequest = (email, password) => {
  return api.post("/user/login", {
    email,
    password,
  });
};

export const signupRequest = (email, password) => {
  return api.post("/user/signup", {
    email,
    password,
  });
};

export const logoutRequest = () => {
  return api.post("/user/logout");
};

export const refreshRequest = () => {
  return api.get("/user/refresh");
};