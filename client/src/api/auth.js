import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const userRegister = (data) => API.post("/auth/register", data);
export const userLogin = (data) => API.post("/auth/login", data);

export const getMe = (token) => {
  return API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const profile = getMe;
