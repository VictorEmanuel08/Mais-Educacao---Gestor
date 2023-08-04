import axios from "axios";

export const app = axios.create({
  // baseURL: "http://192.168.6.20:3011",
  baseURL: "http://34.151.211.219:3010",
  // baseURL: "34.151.211.219:3010",
});

export const createSession = async (mat, password) => {
  return app.post("/escolas/users/professores/login", { mat, password });
};
