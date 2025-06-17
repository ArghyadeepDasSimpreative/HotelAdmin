import { apiPrivate } from "../api/config"

export const getFeatures = () => {
    return apiPrivate.get("/features")
}