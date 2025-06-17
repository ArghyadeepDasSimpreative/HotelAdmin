import { apiPrivate, apiPrivateForm } from "../api/config";

export function createProperty(payload) {
    return apiPrivateForm.post("/properties", payload);
}

export function getProperties() {
    return apiPrivate.get("/properties");
}