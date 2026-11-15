import client from "./client";

export const register = (details) => client.post("/auth/register", details).then((response) => response.data);
export const login = (credentials) => client.post("/auth/login", credentials).then((response) => response.data);
export const getMe = () => client.get("/auth/me").then((response) => response.data);
export const forgotPassword = (email) => client.post("/auth/forgot-password", { email }).then((response) => response.data);
