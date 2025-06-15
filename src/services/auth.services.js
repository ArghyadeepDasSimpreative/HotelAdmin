import { apiPublic } from "../api/config"

export const registerUser = (payload) => {
    return apiPublic.post("/auth/register", payload);
}

export const loginUser = (payload) => {
    return apiPublic.post("/auth/login", payload)
}